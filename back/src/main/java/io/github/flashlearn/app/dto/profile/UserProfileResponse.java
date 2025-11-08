package io.github.flashlearn.app.dto.profile;

public record UserProfileResponse (
        Long uniqueId,
        String username,
        // Avatar avatar,
        String aboutMe) {}
