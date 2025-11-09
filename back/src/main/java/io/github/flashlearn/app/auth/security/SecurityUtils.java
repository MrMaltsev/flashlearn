package io.github.flashlearn.app.auth.security;

import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 * Утилитный класс для работы с SecurityContext и получения информации о текущем аутентифицированном пользователе
 */
@Component
@RequiredArgsConstructor
public class SecurityUtils {

    private final UserRepository userRepository;

    /**
     * Получает имя пользователя из SecurityContext
     * @return имя текущего аутентифицированного пользователя
     * @throws IllegalStateException если пользователь не аутентифицирован
     */
    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("Пользователь не аутентифицирован");
        }

        Object principal = authentication.getPrincipal();
        
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            return (String) principal;
        } else {
            throw new IllegalStateException("Неизвестный тип principal: " + principal.getClass());
        }
    }

    /**
     * Получает объект User текущего аутентифицированного пользователя из базы данных
     * @return объект User текущего пользователя
     * @throws UserNotFoundException если пользователь не найден в базе данных
     * @throws IllegalStateException если пользователь не аутентифицирован
     */
    public User getCurrentUser() {
        String username = getCurrentUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Пользователь не найден: " + username));
    }

    /**
     * Проверяет, является ли текущий пользователь владельцем указанного ресурса
     * @param resourceOwnerUsername имя пользователя-владельца ресурса
     * @return true, если текущий пользователь является владельцем
     */
    public boolean isCurrentUser(String resourceOwnerUsername) {
        try {
            String currentUsername = getCurrentUsername();
            return currentUsername.equals(resourceOwnerUsername);
        } catch (IllegalStateException e) {
            return false;
        }
    }

    /**
     * Проверяет, аутентифицирован ли текущий пользователь
     * @return true, если пользователь аутентифицирован
     */
    public boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated() 
                && !"anonymousUser".equals(authentication.getPrincipal());
    }
}

