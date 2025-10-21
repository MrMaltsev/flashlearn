package io.github.flashlearn.app.controller;

import io.github.flashlearn.app.dto.UserEditRequest;
import io.github.flashlearn.app.dto.UserResponse;
import io.github.flashlearn.app.entity.User;
import io.github.flashlearn.app.mapper.UserMapper;
import io.github.flashlearn.app.service.ProfileEditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/users")
public class UserProfileController {

    private final ProfileEditService profileEditService;
    private final UserMapper mapper;

    @PutMapping("/edit/{id}")
    public ResponseEntity<UserResponse> editProfileInformation(
            @PathVariable Long id,
            @RequestBody UserEditRequest request) {
        User response = profileEditService.editUserInfo(id, request);
        return ResponseEntity.ok().body(mapper.toResponse(response));
    }

}
