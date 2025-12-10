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

@Service
@RequiredArgsConstructor
public class UserDashboardService {

    private final UserStatsRepository userStatsRepository;
    private final SecurityUtils securityUtils;

    public UserStats findByUsername(String username) {
        verifyOwnership(username);
        return loadUserStats(username);
    }

    public List<FlashCardSet> getOwnerSets(String username) {
        verifyOwnership(username);
        return loadUserStats(username).getUser().getFlashCardSets();
    }

    public UserStats updateUserDailyGoal(String username, UpdateDailyGoalRequestDto request) {
        verifyOwnership(username);

        UserStats userStats = loadUserStats(username);

        userStats.setDailyGoal(request.dailyGoal());
        return userStatsRepository.save(userStats);
    }

    private UserStats loadUserStats(String username) {
        return userStatsRepository.findByUser_Username(username)
                .orElseThrow(() -> new UserStatsNotFoundException("User stats not found: " + username));
    }

    private void verifyOwnership(String username) {
        if (!securityUtils.isCurrentUser(username)) {
            throw new AccessDeniedException("Нельзя работать с дашбордом другого пользователя");
        }
    }
}
