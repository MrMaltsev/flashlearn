package io.github.flashlearn.app.dto;

public record UserLoginRequest (
        String username,
        String password) {}
