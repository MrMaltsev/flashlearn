package io.github.flashlearn.app.profile.controller;

import io.github.flashlearn.app.profile.dto.UpdateUserProfileRequest;
import io.github.flashlearn.app.profile.dto.UserProfileResponse;
import io.github.flashlearn.app.auth.mapper.UserAuthMapper;
import io.github.flashlearn.app.profile.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/profile")
@RestController
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final UserAuthMapper mapper;

    /**
     * Получение информации о профиле пользователя. Требуется аутентификация.
     * Любой аутентифицированный пользователь может просматривать профили других пользователей.
     */
    @GetMapping("/{username}")
    @PreAuthorize("isAuthenticated()") // Проверяем, что пользователь аутентифицирован
    public ResponseEntity<UserProfileResponse> getProfileInfo(@PathVariable String username) {
        UserProfileResponse userProfileResponse = mapper.toUserProfileResponse(userProfileService.findByUsername(username));
        return ResponseEntity.status(HttpStatus.OK).body(userProfileResponse);
    }

    /**
     * Обновление профиля пользователя. Требуется аутентификация.
     * Пользователь может обновлять только свой собственный профиль (проверка в сервисе).
     */
    @PutMapping("/update/{username}")
    @PreAuthorize("isAuthenticated()") // Проверяем, что пользователь аутентифицирован
    public ResponseEntity<UserProfileResponse> updateProfile(@PathVariable String username,
                                                             @RequestBody UpdateUserProfileRequest updatedUser) {
        UserProfileResponse userProfileResponse =
                mapper.toUserProfileResponse(userProfileService.updateProfile(username, updatedUser));

        return ResponseEntity.status(HttpStatus.OK).body(userProfileResponse);
    }

}
