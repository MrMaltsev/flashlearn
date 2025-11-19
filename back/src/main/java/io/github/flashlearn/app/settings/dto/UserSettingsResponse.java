package io.github.flashlearn.app.settings.dto;

public record UserSettingsResponse(
    String language,
    boolean theme,
    boolean notificationsEnabled,
    boolean autoPlay
) {}
