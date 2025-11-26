package io.github.flashlearn.app.user.service;

import io.github.flashlearn.app.user.dto.UpdateDailyGoalRequestDto;
import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.user_stats.entity.UserStats;
import io.github.flashlearn.app.user_stats.repository.UserStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDashboardService {

    private final UserStatsRepository userStatsRepository;

    public UserStats findByUsername(String username) {
        return userStatsRepository.findByUser_Username(username)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + username));
    }

    public UserStats updateUserDailyGoal(String username, UpdateDailyGoalRequestDto request) {
        UserStats userStats = userStatsRepository.findByUser_Username(username)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + username));

        userStats.setDailyGoal(request.dailyGoal());
        return userStatsRepository.save(userStats);
    }
}
