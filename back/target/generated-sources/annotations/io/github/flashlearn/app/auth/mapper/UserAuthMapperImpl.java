package io.github.flashlearn.app.auth.mapper;

import io.github.flashlearn.app.auth.dto.UserRegistrationResponse;
import io.github.flashlearn.app.profile.dto.UpdateUserProfileResponse;
import io.github.flashlearn.app.profile.dto.UserProfileResponse;
import io.github.flashlearn.app.profile.service.AvatarUrlService;
import io.github.flashlearn.app.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-15T11:39:11+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23 (Oracle Corporation)"
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
    public UserProfileResponse toUserProfileResponse(User user, AvatarUrlService avatarUrlService) {
        if ( user == null ) {
            return null;
        }

        Long uniqueId = null;
        String username = null;
        String aboutMe = null;

        uniqueId = user.getId();
        username = user.getUsername();
        aboutMe = user.getAboutMe();

        String avatarUrl = avatarUrlService.buildPublicAvatarUrl(user.getAvatarKey());

        UserProfileResponse userProfileResponse = new UserProfileResponse( uniqueId, username, avatarUrl, aboutMe );

        return userProfileResponse;
    }

    @Override
    public UpdateUserProfileResponse toUpdateUserProfileResponse(User user) {
        if ( user == null ) {
            return null;
        }

        Long uniqueId = null;
        String username = null;
        String aboutMe = null;

        uniqueId = user.getId();
        username = user.getUsername();
        aboutMe = user.getAboutMe();

        UpdateUserProfileResponse updateUserProfileResponse = new UpdateUserProfileResponse( uniqueId, username, aboutMe );

        return updateUserProfileResponse;
    }
}
