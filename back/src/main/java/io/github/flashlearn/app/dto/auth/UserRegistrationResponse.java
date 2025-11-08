package io.github.flashlearn.app.dto.auth;

public record UserRegistrationResponse(
    Long id,
    String username,
    String role) {}
