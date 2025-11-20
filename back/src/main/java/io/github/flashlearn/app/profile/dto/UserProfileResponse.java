package io.github.flashlearn.app.profile.dto;

public record UserProfileResponse (
        Long uniqueId,
        String username,
        // Avatar avatar,
        String aboutMe,
        int streakCount,
        int dailyGoal) {}
