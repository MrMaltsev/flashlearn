package io.github.flashlearn.app.service;

import io.github.flashlearn.app.dto.UserEditRequest;
import io.github.flashlearn.app.entity.User;
import io.github.flashlearn.app.exception.UserNotFoundException;
import io.github.flashlearn.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileEditService {

    private final UserRepository userRepository;

    public User editUserInfo(Long id, UserEditRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id not found, id: " + id));

        if(request.getUsername() != null) user.setUsername(request.getUsername());
        if(request.getEmail() != null) user.setEmail(request.getEmail());

        return userRepository.save(user);
    }

}
