package io.github.flashlearn.app.settings.controller;

import io.github.flashlearn.app.settings.dto.UserSettingsResponse;
import io.github.flashlearn.app.settings.dto.UserSettingsUpdateRequest;
import io.github.flashlearn.app.settings.mapper.UserSettingsMapper;
import io.github.flashlearn.app.settings.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsService settingsService;
    private final UserSettingsMapper userSettingsMapper;

    @GetMapping("/{username}")
    public ResponseEntity<UserSettingsResponse> getSettings(@PathVariable String username) {
        UserSettingsResponse userSettings = userSettingsMapper.toUserSettingsResponse(settingsService.getUserSettings(username));
        return ResponseEntity.ok(userSettings);
    }

    @PostMapping("/{username}")
    public ResponseEntity<UserSettingsResponse> updateSettings(@PathVariable String username, @RequestBody UserSettingsUpdateRequest request) {
        var updatedSettings = settingsService.updateUserSettings(username, request);
        var response = userSettingsMapper.toUserSettingsResponse(updatedSettings);
        return ResponseEntity.ok(response);
    }

}
