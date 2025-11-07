package io.github.flashlearn.app.service;

import io.github.flashlearn.app.dto.UserLoginRequest;
import io.github.flashlearn.app.entity.User;
import io.github.flashlearn.app.exception.InvalidCredentialsException;
import io.github.flashlearn.app.exception.UserNotFoundException;
import io.github.flashlearn.app.repository.UserRepository;
import io.github.flashlearn.app.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    // Service for login attempts
    public String loginUser(UserLoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                request.username(),
                request.password()
            )
        );

        User user = (User) authentication.getPrincipal();

        return tokenProvider.generateToken(user.getUsername());
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found " + username));
    }
}
