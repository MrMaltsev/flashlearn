package io.github.flashlearn.app.mapper;

import io.github.flashlearn.app.dto.profile.UserProfileResponse;
import io.github.flashlearn.app.dto.auth.UserRegistrationResponse;
import io.github.flashlearn.app.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "role", expression = "java(user.getRole().name())")
    UserRegistrationResponse toUserResponse(User user);
    
    @Mapping(target = "uniqueId", source = "id")
    UserProfileResponse toUserProfileResponse(User user);
}
