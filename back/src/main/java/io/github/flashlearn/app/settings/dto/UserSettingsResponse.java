package io.github.flashlearn.app.settings.dto;

public record UserSettingsResponse(
    String language,
    String theme,
    boolean notificationsEnabled
) {}
