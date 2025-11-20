package io.github.flashlearn.app.auth.service;

import io.github.flashlearn.app.auth.dto.UserLoginRequest;
import io.github.flashlearn.app.auth.entity.VerificationToken;
import io.github.flashlearn.app.auth.exception.TokenExpiredException;
import io.github.flashlearn.app.auth.exception.TokenNotFoundException;
import io.github.flashlearn.app.auth.repository.VerificationTokenRepository;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.user.repository.UserRepository;
import io.github.flashlearn.app.auth.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

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

        User user = (User) authentication.getPrincipal();
        
        // Обновляем серию заходов
        updateStreak(user);

        return tokenProvider.generateToken(user.getUsername());
    }
    
    /**
     * Обновляет серию заходов пользователя
     * @param user пользователь, для которого обновляется серия
     */
    private void updateStreak(User user) {
        LocalDate today = LocalDate.now();
        LocalDate lastLogin = user.getLastLoginDate();
        
        if (lastLogin == null) {
            // Первый вход пользователя
            user.setLastLoginDate(today);
            user.setStreakCount(1);
        } else if (lastLogin.equals(today)) {
            // Пользователь уже заходил сегодня - не обновляем
            return;
        } else if (lastLogin.plusDays(1).equals(today)) {
            // Пользователь заходил вчера - увеличиваем серию
            user.setStreakCount(user.getStreakCount() + 1);
            user.setLastLoginDate(today);
        } else if (lastLogin.isBefore(today)) {
            // Пользователь заходил раньше - сбрасываем серию
            user.setStreakCount(1);
            user.setLastLoginDate(today);
        }
        
        userRepository.save(user);
    }

    public void verifyToken(String token) {
        VerificationToken t = verificationTokenRepository.findById(token)
                .orElseThrow(() -> new TokenNotFoundException("Token not found: " + token));

        if(t.getExpiresAt().isBefore(LocalDateTime.now().atZone(ZoneOffset.UTC).toInstant()))
            throw new TokenExpiredException("Token expired: " + token);

        User user = userRepository.findById(t.getUser().getId()).get();
        user.setEmailVerified(true);
        userRepository.save(user);

        verificationTokenRepository.delete(t);
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found " + username));
    }
}
