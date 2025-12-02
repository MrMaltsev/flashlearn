package io.github.flashlearn.app.settings.mapper;

import io.github.flashlearn.app.settings.dto.UserSettingsResponse;
import io.github.flashlearn.app.settings.dto.UserSettingsUpdateRequest;
import io.github.flashlearn.app.settings.entity.UserSettings;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-02T13:58:43+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class UserSettingsMapperImpl implements UserSettingsMapper {

    @Override
    public UserSettingsResponse toUserSettingsResponse(UserSettings userSettings) {
        if ( userSettings == null ) {
            return null;
        }

        String language = null;
        boolean darkMode = false;
        boolean showHints = false;
        boolean autoPlay = false;

        language = mapLanguage( userSettings.getLanguage() );
        darkMode = userSettings.isDarkMode();
        showHints = userSettings.isShowHints();
        autoPlay = userSettings.isAutoPlay();

        UserSettingsResponse userSettingsResponse = new UserSettingsResponse( language, darkMode, showHints, autoPlay );

        return userSettingsResponse;
    }

    @Override
    public UserSettings toUserSettings(UserSettingsResponse userSettingsResponse) {
        if ( userSettingsResponse == null ) {
            return null;
        }

        UserSettings userSettings = new UserSettings();

        userSettings.setLanguage( mapLanguage( userSettingsResponse.language() ) );
        userSettings.setDarkMode( userSettingsResponse.darkMode() );
        userSettings.setAutoPlay( userSettingsResponse.autoPlay() );
        userSettings.setShowHints( userSettingsResponse.showHints() );

        return userSettings;
    }

    @Override
    public UserSettings toUserSettings(UserSettingsUpdateRequest userSettingsUpdateRequest) {
        if ( userSettingsUpdateRequest == null ) {
            return null;
        }

        UserSettings userSettings = new UserSettings();

        userSettings.setLanguage( mapLanguage( userSettingsUpdateRequest.language() ) );
        userSettings.setDarkMode( userSettingsUpdateRequest.darkMode() );
        userSettings.setAutoPlay( userSettingsUpdateRequest.autoPlay() );
        userSettings.setShowHints( userSettingsUpdateRequest.showHints() );

        return userSettings;
    }
}
