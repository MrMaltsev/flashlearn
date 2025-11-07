package io.github.flashlearn.app.dto;

public record UserResponse (
    Long id,
    String username,
    String role) {}
