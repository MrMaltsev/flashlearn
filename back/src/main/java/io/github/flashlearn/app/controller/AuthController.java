package io.github.flashlearn.app.controller;

import io.github.flashlearn.app.dto.AuthResponse;
import io.github.flashlearn.app.dto.UserLoginRequest;
import io.github.flashlearn.app.dto.UserResponse;
import io.github.flashlearn.app.entity.User;
import io.github.flashlearn.app.mapper.UserMapper;
import io.github.flashlearn.app.service.AuthService;
import io.github.flashlearn.app.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // Controller for login attempts
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody UserLoginRequest loginRequest) {
        String token = authService.loginUser(loginRequest);
        User user = authService.findUserByUsername(loginRequest.username());

        return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getRole().name()));
    }
}
