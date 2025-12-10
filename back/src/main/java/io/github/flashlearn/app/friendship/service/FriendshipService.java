package io.github.flashlearn.app.friendship.service;

import io.github.flashlearn.app.auth.security.SecurityUtils;
import io.github.flashlearn.app.friendship.entity.Friendship;
import io.github.flashlearn.app.friendship.exception.FiendshipRequestNotFoundException;
import io.github.flashlearn.app.friendship.exception.Forbidden;
import io.github.flashlearn.app.friendship.exception.FriendshipAlreadyExistsException;
import io.github.flashlearn.app.friendship.repository.FriendshipRepository;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static io.github.flashlearn.app.friendship.entity.FriendshipStatus.ACCEPTED;
import static io.github.flashlearn.app.friendship.entity.FriendshipStatus.PENDING;

@Service
@RequiredArgsConstructor
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final SecurityUtils securityUtils;
    private final UserRepository userRepository;

    @Transactional
    public Friendship sendFriendshipRequest(String receiverUsername) {
        User requester = securityUtils.getCurrentUser();
        User receiver = userRepository.findByUsername(receiverUsername).
                orElseThrow(() -> new UserNotFoundException("User not found: " + receiverUsername));

//        if (friendshipRepository.existsByUsers(requester, receiver)) {
//            throw new FriendshipAlreadyExistsException("Friendship between users already exists: " + requester + receiver);
//        }

        Friendship friendship = new Friendship();
        friendship.setRequester(requester);
        friendship.setReceiver(receiver);
        friendship.setStatus(PENDING);
        friendship.setCreatedAt(LocalDateTime.now());

        return friendshipRepository.save(friendship);
    }

    public Friendship acceptFriendshipRequest(Long requestId) {
        User currentUser = securityUtils.getCurrentUser();
        Friendship friendship = friendshipRepository.findById(requestId)
                .orElseThrow(() -> new FiendshipRequestNotFoundException("friendship request not found: " + requestId));

        if (!(friendship.getRequester().getId().equals(currentUser.getId()))) {
            throw new Forbidden("Not your request");
        }

        friendship.setStatus(ACCEPTED);
        return friendshipRepository.save(friendship);
    }
}
