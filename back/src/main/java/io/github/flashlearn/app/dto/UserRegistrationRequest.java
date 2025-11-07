package io.github.flashlearn.app.dto;

public record UserRegistrationRequest (
        String username,
        String password,
        String email) {}
