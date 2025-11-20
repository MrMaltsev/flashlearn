package io.github.flashlearn.app.settings.mapper;

import io.github.flashlearn.app.settings.dto.UserSettingsResponse;
import io.github.flashlearn.app.settings.dto.UserSettingsUpdateRequest;
import io.github.flashlearn.app.settings.entity.Language;
import io.github.flashlearn.app.settings.entity.Theme;
import io.github.flashlearn.app.settings.entity.UserSettings;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserSettingsMapper {
    @Mapping(target = "language", expression = "java(userSettings.getLanguage().name())")
    @Mapping(target = "theme", expression = "java(userSettings.getTheme().name())")
    @Mapping(target = "darkMode", expression = "java(userSettings.getTheme() == Theme.DARK)")
    @Mapping(target = "showHints", source = "userSettings.showHints")
    @Mapping(target = "autoPlay", source = "userSettings.autoPlay")
    UserSettingsResponse toUserSettingsResponse(UserSettings userSettings);
    
    @Mapping(target = "language", expression = "java(Language.valueOf(userSettingsUpdateRequest.language()))")
    @Mapping(target = "theme", expression = "java(userSettingsUpdateRequest.darkMode() ? Theme.DARK : Theme.LIGHT)")
    @Mapping(target = "showHints", source = "userSettingsUpdateRequest.showHints")
    @Mapping(target = "autoPlay", source = "userSettingsUpdateRequest.autoPlay")
    UserSettings toUserSettings(UserSettingsUpdateRequest userSettingsUpdateRequest);
}
