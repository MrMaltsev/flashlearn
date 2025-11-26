package io.github.flashlearn.app.user.mapper;

import io.github.flashlearn.app.flashcard.entity.FlashCard;
import io.github.flashlearn.app.user.dto.UserDashboardResponseDto;
import io.github.flashlearn.app.user.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-24T18:44:43+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class UserDashboardMapperImpl implements UserDashboardMapper {

    @Override
    public UserDashboardResponseDto toUserResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        String username = null;
        List<FlashCard> flashCards = null;

        username = user.getUsername();
        List<FlashCard> list = user.getFlashCards();
        if ( list != null ) {
            flashCards = new ArrayList<FlashCard>( list );
        }

        Integer streak = null;
        Integer dailyGoal = null;

        UserDashboardResponseDto userDashboardResponseDto = new UserDashboardResponseDto( username, streak, dailyGoal, flashCards );

        return userDashboardResponseDto;
    }
}
