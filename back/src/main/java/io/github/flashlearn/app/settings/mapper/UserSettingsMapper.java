package io.github.flashlearn.app.settings.mapper;

import io.github.flashlearn.app.settings.dto.UserSettingsResponse;
import io.github.flashlearn.app.settings.entity.UserSettings;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserSettingsMapper {
    @Mapping(target = "language", expression = "java(userSettings.getLanguage().name())")
    @Mapping(target = "theme", expression = "java(userSettings.getTheme().name())")
    UserSettingsResponse toUserSettingsResponse(UserSettings userSettings);
}
