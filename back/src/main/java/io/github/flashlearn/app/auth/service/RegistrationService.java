package io.github.flashlearn.app.auth.service;

import io.github.flashlearn.app.auth.dto.UserRegistrationRequest;
import io.github.flashlearn.app.settings.entity.UserSettings;
import io.github.flashlearn.app.settings.repository.UserSettingsRepository;
import io.github.flashlearn.app.user.entity.Role;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user.exception.UserAlreadyExistsException;
import io.github.flashlearn.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailConfirmationService emailConfirmationService;
    private final UserSettingsRepository userSettingsRepository;

    // Service for registration attempts
    public User registerUser(UserRegistrationRequest request) {
        String username = request.username();
        String encodedPassword = passwordEncoder.encode(request.password());
        String email = request.email();

        if(userRepository.existsByUsername(username)) {
            throw new UserAlreadyExistsException("User already exists");
        }
        
        User user = new User(username, encodedPassword, email, Role.USER);
        userRepository.save(user);

        UserSettings userSettings = new UserSettings();
        userSettings.setUser(user);
        userSettingsRepository.save(userSettings);

        // Send confirmation email
        emailConfirmationService.sendConfirmation(user);

        return user;
    }

}
