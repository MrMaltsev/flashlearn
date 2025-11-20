package io.github.flashlearn.app.settings.dto;

public record UserSettingsUpdateRequest(
    String language,
    boolean showHints,
    boolean autoPlay,
    boolean darkMode
) {}