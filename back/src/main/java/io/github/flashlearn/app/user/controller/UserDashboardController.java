package io.github.flashlearn.app.user.controller;

import io.github.flashlearn.app.user.dto.UserDashboardResponseDto;
import io.github.flashlearn.app.user.mapper.UserDashboardMapper;
import io.github.flashlearn.app.user.service.UserDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/dashboard")
@RestController
@RequiredArgsConstructor
public class UserDashboardController {

    private final UserDashboardService userDashboardService;
    private final UserDashboardMapper userDashboardMapper;

    @GetMapping("/{username}")
    public ResponseEntity<UserDashboardResponseDto> getUserInfo(@PathVariable String username) {
        UserDashboardResponseDto userResponse = userDashboardMapper
                .toUserDashboardResponseDto(userDashboardService.findByUsername(username));
        return ResponseEntity.status(HttpStatus.OK).body(userResponse);
    }
}
