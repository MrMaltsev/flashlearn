package io.github.flashlearn.app.user_stats.controller;

import io.github.flashlearn.app.auth.service.AuthService;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user_stats.service.UserStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserStatsController {

    private final UserStatsService userStatsService;
    private final AuthService authService;

    @GetMapping("/ping")
    public ResponseEntity<?> ping() {
        User user = authService.getCurrentUser();
        userStatsService.updateStreak(user);
        return ResponseEntity.ok().build();
    }

}
