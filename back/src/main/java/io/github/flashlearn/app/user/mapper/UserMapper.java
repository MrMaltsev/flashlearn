package io.github.flashlearn.app.user.mapper;

import io.github.flashlearn.app.profile.dto.UserProfileResponse;
import io.github.flashlearn.app.auth.dto.UserRegistrationResponse;
import io.github.flashlearn.app.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "role", expression = "java(user.getRole().name())")
    UserRegistrationResponse toUserResponse(User user);
    
    @Mapping(target = "uniqueId", source = "id")
    @Mapping(target = "streakCount", source = "streakCount")
    @Mapping(target = "dailyGoal", source = "dailyGoal")
    UserProfileResponse toUserProfileResponse(User user);
}
