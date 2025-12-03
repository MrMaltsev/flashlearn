package io.github.flashlearn.app.user.service;

import io.github.flashlearn.app.flashcard.entity.FlashCard;
import io.github.flashlearn.app.flashcard.entity.FlashCardSet;
import io.github.flashlearn.app.user.dto.UpdateDailyGoalRequestDto;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.user_stats.UserStatsNotFoundException;
import io.github.flashlearn.app.user_stats.entity.UserStats;
import io.github.flashlearn.app.user_stats.repository.UserStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDashboardService {

    private final UserStatsRepository userStatsRepository;

    public UserStats findByUsername(String username) {
        return userStatsRepository.findByUser_Username(username)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + username));
    }

    public List<FlashCardSet> getOwnerSets(String username) {
        UserStats userStats = userStatsRepository.findByUser_Username(username)
                .orElseThrow(() -> new UserStatsNotFoundException("User stats not found: " + username));
        return userStats.getUser().getFlashCardSets();
    }

    public UserStats updateUserDailyGoal(String username, UpdateDailyGoalRequestDto request) {
        UserStats userStats = userStatsRepository.findByUser_Username(username)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + username));

        userStats.setDailyGoal(request.dailyGoal());
        return userStatsRepository.save(userStats);
    }
}
