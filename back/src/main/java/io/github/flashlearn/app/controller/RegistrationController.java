package io.github.flashlearn.app.controller;

import io.github.flashlearn.app.dto.UserResponse;
import io.github.flashlearn.app.dto.UserRegistrationRequest;
import io.github.flashlearn.app.entity.FlashCard;
import io.github.flashlearn.app.entity.User;
import io.github.flashlearn.app.mapper.FlashCardMapper;
import io.github.flashlearn.app.mapper.UserMapper;
import io.github.flashlearn.app.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/auth")
@RequiredArgsConstructor
@RestController
public class RegistrationController {

    private final RegistrationService registrationService;
    private final UserMapper mapper;

    // Controller for registration attempt
    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
        User createdUser = registrationService.registerUser(registrationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toResponse(createdUser));
    }
}
