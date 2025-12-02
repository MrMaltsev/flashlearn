package io.github.flashlearn.app.auth.mapper;

import io.github.flashlearn.app.auth.dto.UserRegistrationResponse;
import io.github.flashlearn.app.profile.dto.UserProfileResponse;
import io.github.flashlearn.app.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-02T13:58:43+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class UserAuthMapperImpl implements UserAuthMapper {

    @Override
    public UserRegistrationResponse toUserRegistrationResponse(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String email = null;

        id = user.getId();
        email = user.getEmail();

        String role = user.getRole().name();

        UserRegistrationResponse userRegistrationResponse = new UserRegistrationResponse( id, email, role );

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
