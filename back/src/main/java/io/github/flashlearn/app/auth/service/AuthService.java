package io.github.flashlearn.app.auth.service;

import io.github.flashlearn.app.auth.dto.UserLoginRequest;
import io.github.flashlearn.app.auth.repository.VerificationTokenRepository;
import io.github.flashlearn.app.auth.security.CustomUserDetails;
import io.github.flashlearn.app.auth.security.JwtTokenProvider;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final VerificationTokenRepository verificationTokenRepository;

    // Service for login attempts
    public String loginUser(UserLoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                request.username(),
                request.password()
            )
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        return tokenProvider.generateToken(Long.valueOf(userDetails.getUsername()));
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found " + username));
    }

    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if(auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("User is not authenticated");
        }

        Long userId = Long.valueOf(auth.getName());

        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + userId));
    }
}
