package io.github.flashlearn.app.mapper;

import io.github.flashlearn.app.dto.auth.UserRegistrationResponse;
import io.github.flashlearn.app.dto.profile.UserProfileResponse;
import io.github.flashlearn.app.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-08T16:26:10+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserRegistrationResponse toUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String username = null;

        id = user.getId();
        username = user.getUsername();

        String role = user.getRole().name();

        UserRegistrationResponse userRegistrationResponse = new UserRegistrationResponse( id, username, role );

        return userRegistrationResponse;
    }

    @Override
    public UserProfileResponse toUserProfileResponse(User user) {
        if ( user == null ) {
            return null;
        }

        Long uniqueId = null;
        String username = null;
        String aboutMe = null;

        uniqueId = user.getId();
        username = user.getUsername();
        aboutMe = user.getAboutMe();

        UserProfileResponse userProfileResponse = new UserProfileResponse( uniqueId, username, aboutMe );

        return userProfileResponse;
    }
}
