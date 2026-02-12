package io.github.flashlearn.app.user.mapper;

import io.github.flashlearn.app.flashcard.dto.FlashCardSetResponse;
import io.github.flashlearn.app.user.dto.UserDashboardResponseDto;
import io.github.flashlearn.app.user_stats.entity.UserStats;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-12T15:06:23+0300",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.45.0.v20260128-0750, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class UserDashboardMapperImpl implements UserDashboardMapper {

    @Override
    public UserDashboardResponseDto toUserDashboardResponseDto(UserStats userStats) {
        if ( userStats == null ) {
            return null;
        }

        int streak = 0;
        int dailyGoal = 0;
        int reviewedToday = 0;
        boolean dailyGoalCompleted = false;

        streak = userStats.getStreak();
        dailyGoal = userStats.getDailyGoal();
        reviewedToday = userStats.getReviewedToday();
        dailyGoalCompleted = userStats.isDailyGoalCompleted();

        List<FlashCardSetResponse> flashCards = null;

        UserDashboardResponseDto userDashboardResponseDto = new UserDashboardResponseDto( streak, dailyGoal, reviewedToday, dailyGoalCompleted, flashCards );

        return userDashboardResponseDto;
    }
}
