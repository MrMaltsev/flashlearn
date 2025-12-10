package io.github.flashlearn.app.user.service;

import io.github.flashlearn.app.auth.security.SecurityUtils;
import io.github.flashlearn.app.flashcard.entity.FlashCardSet;
import io.github.flashlearn.app.user.dto.UpdateDailyGoalRequestDto;
import io.github.flashlearn.app.user_stats.exception.UserStatsNotFoundException;
import io.github.flashlearn.app.user_stats.entity.UserStats;
import io.github.flashlearn.app.user_stats.repository.UserStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserDashboardService {

    private final UserStatsRepository userStatsRepository;
    private final SecurityUtils securityUtils;

    public UserStats findByUsername(String username) {
        verifyOwnership(username);
        return ensureFresh(loadUserStats(username));
    }

    public List<FlashCardSet> getOwnerSets(String username) {
        verifyOwnership(username);
        return ensureFresh(loadUserStats(username)).getUser().getFlashCardSets();
    }

    public UserStats updateUserDailyGoal(String username, UpdateDailyGoalRequestDto request) {
        verifyOwnership(username);

        UserStats userStats = ensureFresh(loadUserStats(username));

        userStats.setDailyGoal(request.dailyGoal());
        return userStatsRepository.save(userStats);
    }

    private UserStats loadUserStats(String username) {
        return userStatsRepository.findByUser_Username(username)
                .orElseThrow(() -> new UserStatsNotFoundException("User stats not found: " + username));
    }

    private UserStats ensureFresh(UserStats stats) {
        LocalDate today = LocalDate.now();
        if (stats.getReviewedDate() == null || !today.equals(stats.getReviewedDate())) {
            stats.setReviewedDate(today);
            stats.setReviewedToday(0);
            stats.setDailyGoalCompleted(false);
            return userStatsRepository.save(stats);
        }
        return stats;
    }

    private void verifyOwnership(String username) {
        if (!securityUtils.isCurrentUser(username)) {
            throw new AccessDeniedException("Нельзя работать с дашбордом другого пользователя");
        }
    }
}
