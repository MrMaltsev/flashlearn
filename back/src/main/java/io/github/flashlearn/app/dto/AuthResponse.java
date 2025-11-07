package io.github.flashlearn.app.dto;

public record AuthResponse(
        String token,
        String username,
        String role) {}

