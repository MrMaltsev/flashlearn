package io.github.flashlearn.app.service;

import io.github.flashlearn.app.dto.UserLoginRequest;
import io.github.flashlearn.app.dto.UserResponse;
import io.github.flashlearn.app.entity.User;
import io.github.flashlearn.app.exception.InvalidCredentialsException;
import io.github.flashlearn.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Service for login attempts
    public User loginUser(UserLoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).
                orElseThrow(() -> new UsernameNotFoundException("User with " + request.getUsername() + " username was not found"));

        // Method that checks if the password is correct for this particular login
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        return user;
    }
}
