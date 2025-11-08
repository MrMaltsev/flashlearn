package io.github.flashlearn.app.dto.auth;

public record UserRegistrationRequest (
        String username,
        String password,
        String email) {}
