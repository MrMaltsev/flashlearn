package io.github.flashlearn.app.settings.dto;

public record UserSettingsUpdateRequest(
        String language,
        boolean theme,
        boolean notificationsEnabled,
        boolean autoPlay
) {}
