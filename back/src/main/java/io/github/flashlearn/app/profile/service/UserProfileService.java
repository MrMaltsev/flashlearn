package io.github.flashlearn.app.profile.service;

import io.github.flashlearn.app.auth.security.SecurityUtils;
import io.github.flashlearn.app.flashcard.exception.UnauthorizedAccessException;
import io.github.flashlearn.app.profile.dto.DailyGoalRequest;
import io.github.flashlearn.app.profile.dto.UpdateUserProfileRequest;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;
    private final SecurityUtils securityUtils;

    /**
     * Находит пользователя по имени пользователя. Любой аутентифицированный пользователь может просматривать профили.
     * @param username имя пользователя
     * @return найденный пользователь
     */
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).
                orElseThrow(() -> new UserNotFoundException("user not found: " + username));
    }

    /**
     * Обновляет профиль пользователя. Пользователь может обновлять только свой собственный профиль.
     * @param username имя пользователя, профиль которого нужно обновить
     * @param updatedUser новые данные профиля
     * @return обновленный пользователь
     * @throws UnauthorizedAccessException если пользователь пытается обновить чужой профиль
     */
    public User updateProfile(String username, UpdateUserProfileRequest updatedUser) {
        // Получаем текущего аутентифицированного пользователя
        User currentUser = securityUtils.getCurrentUser();
        
        // Находим пользователя, профиль которого нужно обновить
        User user = userRepository.findByUsername(username).
                orElseThrow(() -> new UserNotFoundException("can not find user " + username));

        // Проверяем, что текущий пользователь обновляет свой собственный профиль
        if (!currentUser.getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("У вас нет прав для обновления профиля другого пользователя");
        }

        // Обновляем данные профиля
        user.setUsername(updatedUser.username());
        user.setAboutMe(updatedUser.aboutMe());

        return userRepository.save(user);
    }

    /**
     * Обновляет ежедневную цель пользователя
     * @param username имя пользователя
     * @param dailyGoal новое значение ежедневной цели
     * @return обновленный пользователь
     */
    public User updateDailyGoal(String username, int dailyGoal) {
        User user = userRepository.findByUsername(username).
                orElseThrow(() -> new UserNotFoundException("user not found: " + username));
        
        user.setDailyGoal(dailyGoal);
        return userRepository.save(user);
    }

}
