package io.github.flashlearn.app.friendship.controller;

import io.github.flashlearn.app.friendship.dto.AcceptFriendRequestDto;
import io.github.flashlearn.app.friendship.dto.SendFriendRequestDto;
import io.github.flashlearn.app.friendship.dto.FriendRequestResponseDto;
import io.github.flashlearn.app.friendship.dto.FriendRequestNotificationDto;
import io.github.flashlearn.app.friendship.dto.UserSearchResponseDto;
import io.github.flashlearn.app.friendship.mapper.FriendshipMapper;
import io.github.flashlearn.app.friendship.service.FriendshipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friendship")
@RequiredArgsConstructor
public class FriendshipController {

    private final FriendshipService friendshipService;
    private final FriendshipMapper mapper;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/send")
    public ResponseEntity<FriendRequestResponseDto> sendRequest(
            @RequestBody @Valid SendFriendRequestDto request) {
        FriendRequestResponseDto response =
                mapper.toFriendRequestResponseDto(
                        friendshipService.sendFriendshipRequest(request.receiver()));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/accept")
    public ResponseEntity<FriendRequestResponseDto> acceptRequest(
            @RequestBody @Valid AcceptFriendRequestDto request) {
        FriendRequestResponseDto response =
                mapper.toFriendRequestResponseDto(
                        friendshipService.acceptFriendshipRequest(request.id()));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/decline")
    public ResponseEntity<FriendRequestResponseDto> declineRequest(
            @RequestBody @Valid AcceptFriendRequestDto request) {
        FriendRequestResponseDto response =
                mapper.toFriendRequestResponseDto(
                        friendshipService.declineFriendshipRequest(request.id()));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/requests")
    public ResponseEntity<List<FriendRequestNotificationDto>> incomingRequests() {
        return ResponseEntity.ok(friendshipService.getIncomingRequests());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/friends")
    public ResponseEntity<List<String>> friends() {
        return ResponseEntity.ok(friendshipService.getFriends());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/search")
    public ResponseEntity<List<UserSearchResponseDto>> searchUsers(@RequestParam("query") String query) {
        return ResponseEntity.ok(friendshipService.searchUsers(query));
    }
}
