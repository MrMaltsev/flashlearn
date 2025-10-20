package io.github.flashlearn.app.service;

import io.github.flashlearn.app.dto.UserResponse;
import io.github.flashlearn.app.dto.UserRegistrationRequest;
import io.github.flashlearn.app.entity.Role;
import io.github.flashlearn.app.entity.User;
import io.github.flashlearn.app.exception.UserAlreadyExistsException;
import io.github.flashlearn.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Service for registration attempts
    public User registerUser(UserRegistrationRequest request) {
        String username = request.getUsername();
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        if(userRepository.existsByUsername(username)) {
            throw new UserAlreadyExistsException("User already exists");
        }
        
        User user = new User(username, encodedPassword, Role.USER);
        return userRepository.save(user);
    }
}
