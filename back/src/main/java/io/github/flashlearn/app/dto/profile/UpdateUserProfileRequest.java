package io.github.flashlearn.app.dto.profile;

public record UpdateUserProfileRequest(
        String username,
        String aboutMe) {}
