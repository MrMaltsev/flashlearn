package io.github.flashlearn.app.profile.service;

import io.github.flashlearn.app.profile.dto.UpdateUserProfileRequest;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).
                orElseThrow(() -> new UserNotFoundException("user not found: " + username));
    }

    public User updateProfile(String username, UpdateUserProfileRequest updatedUser) {
        User user = userRepository.findByUsername(username).
                orElseThrow(() -> new UserNotFoundException("can not find user " + username));

        user.setUsername(updatedUser.username());
        user.setAboutMe(updatedUser.aboutMe());

        return userRepository.save(user);
    }

}
