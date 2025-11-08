package io.github.flashlearn.app.dto.auth;

public record UserLoginRequest (
        String username,
        String password) {}
