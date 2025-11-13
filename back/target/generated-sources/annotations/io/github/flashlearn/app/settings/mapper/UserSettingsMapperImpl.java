package io.github.flashlearn.app.settings.mapper;

import io.github.flashlearn.app.settings.dto.UserSettingsResponse;
import io.github.flashlearn.app.settings.entity.UserSettings;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-13T12:57:23+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class UserSettingsMapperImpl implements UserSettingsMapper {

    @Override
    public UserSettingsResponse toUserSettingsResponse(UserSettings userSettings) {
        if ( userSettings == null ) {
            return null;
        }

        boolean notificationsEnabled = false;

        notificationsEnabled = userSettings.isNotificationsEnabled();

        String language = userSettings.getLanguage().name();
        String theme = userSettings.getTheme().name();

        UserSettingsResponse userSettingsResponse = new UserSettingsResponse( language, theme, notificationsEnabled );

        return userSettingsResponse;
    }
}
