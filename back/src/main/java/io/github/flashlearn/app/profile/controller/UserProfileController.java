package io.github.flashlearn.app.profile.controller;

import io.github.flashlearn.app.profile.dto.UpdateUserProfileRequest;
import io.github.flashlearn.app.profile.dto.UserProfileResponse;
import io.github.flashlearn.app.user.mapper.UserMapper;
import io.github.flashlearn.app.profile.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final UserMapper mapper;

    @GetMapping("/{username}")
    public ResponseEntity<UserProfileResponse> getProfileInfo(@PathVariable String username) {
        UserProfileResponse userProfileResponse = mapper.toUserProfileResponse(userProfileService.findByUsername(username));
        return ResponseEntity.status(HttpStatus.OK).body(userProfileResponse);
    }

    @PutMapping("/{username}/update")
    public ResponseEntity<UserProfileResponse> updateProfile(@PathVariable String username,
                                                             @RequestBody UpdateUserProfileRequest updatedUser) {
        UserProfileResponse userProfileResponse =
                mapper.toUserProfileResponse(userProfileService.updateProfile(username, updatedUser));

        return ResponseEntity.status(HttpStatus.OK).body(userProfileResponse);
    }

}
