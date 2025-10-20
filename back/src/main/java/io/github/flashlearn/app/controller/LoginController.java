package io.github.flashlearn.app.controller;

import io.github.flashlearn.app.dto.UserLoginRequest;
import io.github.flashlearn.app.dto.UserResponse;
import io.github.flashlearn.app.entity.User;
import io.github.flashlearn.app.mapper.FlashCardMapper;
import io.github.flashlearn.app.mapper.UserMapper;
import io.github.flashlearn.app.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/users")
@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;
    private final UserMapper mapper;

    // Controller for login attempts
    @PostMapping("/login")
    public ResponseEntity<UserResponse> loginUser(@RequestBody UserLoginRequest loginRequest) {
        User loginResponse = loginService.loginUser(loginRequest);
        return ResponseEntity.ok().body(mapper.toResponse(loginResponse));
    }
}
