package io.github.flashlearn.app.settings.service;

import io.github.flashlearn.app.settings.entity.Language;
import io.github.flashlearn.app.settings.entity.Theme;
import io.github.flashlearn.app.settings.entity.UserSettings;
import io.github.flashlearn.app.settings.exception.UserSettingsNotFoundException;
import io.github.flashlearn.app.settings.repository.UserSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsService {

    private final UserSettingsRepository userSettingsRepository;

    public UserSettings getUserSettings(String username) {
        return userSettingsRepository.findByUser_Username(username)
                .orElseThrow(() -> new UserSettingsNotFoundException("user with username not found: " + username));
    }   

    public UserSettings saveUserSettings(String username, UserSettings updatedSettings) {
        UserSettings existingSettings = getUserSettings(username);
        
        existingSettings.setTheme(updatedSettings.getTheme());
        existingSettings.setLanguage(updatedSettings.getLanguage());
        // Сохраняем только те настройки, которые пришли из фронтенда, остальные оставляем без изменений
        existingSettings.setShowHints(updatedSettings.isShowHints());
        existingSettings.setAutoPlay(updatedSettings.isAutoPlay());
        
        return userSettingsRepository.save(existingSettings);
    }
    
    public UserSettings updateUserSettings(String username, UserSettingsUpdateRequest request) {
        UserSettings existingSettings = getUserSettings(username);
        
        // Обновляем только те поля, которые пришли из запроса
        if (request.language() != null) {
            // Конвертируем строку в верхний регистр для соответствия enum (например, "en" -> "EN")
            existingSettings.setLanguage(Language.valueOf(request.language().toUpperCase()));
        }
        existingSettings.setTheme(request.darkMode() ? 
            Theme.DARK : 
            Theme.LIGHT);
        existingSettings.setShowHints(request.showHints());
        existingSettings.setAutoPlay(request.autoPlay());
        
        return userSettingsRepository.save(existingSettings);
    }
}
