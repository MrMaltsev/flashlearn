package io.github.flashlearn.app.settings.mapper;

import io.github.flashlearn.app.settings.dto.UserSettingsResponse;
import io.github.flashlearn.app.settings.dto.UserSettingsUpdateRequest;
import io.github.flashlearn.app.settings.entity.UserSettings;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-12T15:06:23+0300",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.45.0.v20260128-0750, environment: Java 21.0.9 (Eclipse Adoptium)"
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
        userSettings.setAutoPlay( userSettingsResponse.autoPlay() );
        userSettings.setDarkMode( userSettingsResponse.darkMode() );
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
        userSettings.setAutoPlay( userSettingsUpdateRequest.autoPlay() );
        userSettings.setDarkMode( userSettingsUpdateRequest.darkMode() );
        userSettings.setShowHints( userSettingsUpdateRequest.showHints() );

        return userSettings;
    }
}
