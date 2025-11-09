package io.github.flashlearn.app.auth.dto;

public record UserRegistrationResponse(
    Long id,
    String username,
    String role) {}
