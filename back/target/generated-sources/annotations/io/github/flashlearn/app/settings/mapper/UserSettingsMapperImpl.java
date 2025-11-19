package io.github.flashlearn.app.settings.mapper;

import io.github.flashlearn.app.settings.dto.UserSettingsResponse;
import io.github.flashlearn.app.settings.entity.UserSettings;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-14T14:40:38+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class UserSettingsMapperImpl implements UserSettingsMapper {

    @Override
    public UserSettingsResponse toUserSettingsResponse(UserSettings userSettings) {
        if ( userSettings == null ) {
            return null;
        }

        boolean theme = false;
        boolean notificationsEnabled = false;
        boolean autoPlay = false;

        theme = userSettings.isTheme();
        notificationsEnabled = userSettings.isNotificationsEnabled();
        autoPlay = userSettings.isAutoPlay();

        String language = userSettings.getLanguage().name();

        UserSettingsResponse userSettingsResponse = new UserSettingsResponse( language, theme, notificationsEnabled, autoPlay );

        return userSettingsResponse;
    }
}
