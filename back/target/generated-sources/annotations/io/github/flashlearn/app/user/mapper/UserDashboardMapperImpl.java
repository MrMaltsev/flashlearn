package io.github.flashlearn.app.user.mapper;

import io.github.flashlearn.app.flashcard.dto.FlashCardSetResponse;
import io.github.flashlearn.app.user.dto.UserDashboardResponseDto;
import io.github.flashlearn.app.user_stats.entity.UserStats;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-22T17:41:25+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
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
