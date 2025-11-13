package io.github.flashlearn.app.settings.service;

import io.github.flashlearn.app.settings.entity.UserSettings;
import io.github.flashlearn.app.settings.exception.UserSettingsNotFoundException;
import io.github.flashlearn.app.settings.repository.UserSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsService {

    private final UserSettingsRepository userSettingsRepository;

    public UserSettings getUserSettings(Long userId) {
        return userSettingsRepository.findByUserId(userId)
                .orElseThrow(() -> new UserSettingsNotFoundException("user with id not found: " + userId));
    }   
}
