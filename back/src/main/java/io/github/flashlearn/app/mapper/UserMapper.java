package io.github.flashlearn.app.mapper;

import io.github.flashlearn.app.dto.UserResponse;
import io.github.flashlearn.app.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getRole().name());
    }
}
