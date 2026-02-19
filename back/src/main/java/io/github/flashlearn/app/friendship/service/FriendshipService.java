package io.github.flashlearn.app.friendship.service;

import io.github.flashlearn.app.auth.security.SecurityUtils;
import io.github.flashlearn.app.friendship.entity.Friendship;
import io.github.flashlearn.app.friendship.exception.FiendshipRequestNotFoundException;
import io.github.flashlearn.app.friendship.exception.Forbidden;
import io.github.flashlearn.app.friendship.exception.FriendshipAlreadyExistsException;
import io.github.flashlearn.app.friendship.repository.FriendshipRepository;
import io.github.flashlearn.app.friendship.dto.FriendRequestNotificationDto;
import io.github.flashlearn.app.friendship.dto.UserSearchResponseDto;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
import java.util.stream.Stream;

import static io.github.flashlearn.app.friendship.entity.FriendshipStatus.*;

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

        if (requester.getId().equals(receiver.getId())) {
            throw new Forbidden("Нельзя добавить самого себя в друзья");
        }

        Optional<Friendship> existing = friendshipRepository.findBetween(requester, receiver);
        // не оч понял как работает
        if (existing.isPresent()) {
            Friendship friendship = existing.get();
            switch (friendship.getStatus()) {
                case ACCEPTED -> throw new FriendshipAlreadyExistsException("Вы уже друзья");
                case PENDING -> {
                    // Если запрос пришел в обратную сторону — принимаем его автоматически
                    if (friendship.getReceiver().getId().equals(requester.getId())) {
                        friendship.setStatus(ACCEPTED);
                        return friendshipRepository.save(friendship);
                    }
                    throw new FriendshipAlreadyExistsException("Заявка уже отправлена");
                }
                case DECLINED, BLOCKED -> throw new FriendshipAlreadyExistsException("Дружба заблокирована или отклонена");
            }
        }

        Friendship friendship = new Friendship();
        friendship.setRequester(requester);
        friendship.setReceiver(receiver);
        friendship.setStatus(PENDING);
        friendship.setCreatedAt(LocalDateTime.now());

        return friendshipRepository.save(friendship);
    }

    public Friendship acceptFriendshipRequest(Long requestId) {
        User currentUser = securityUtils.getCurrentUser();
        // любое исключение снизу = зря достал юзера из бд
        Friendship friendship = friendshipRepository.findById(requestId)
                .orElseThrow(() -> new FiendshipRequestNotFoundException("friendship request not found: " + requestId));

        if (!friendship.getReceiver().getId().equals(currentUser.getId())) {
            throw new Forbidden("Нельзя принять чужую заявку");
        }

        if (friendship.getStatus() != PENDING) {
            throw new FriendshipAlreadyExistsException("Заявка уже обработана");
        }

        friendship.setStatus(ACCEPTED);
        return friendshipRepository.save(friendship);
    }

    public Friendship declineFriendshipRequest(Long requestId) {
        User currentUser = securityUtils.getCurrentUser();
        Friendship friendship = friendshipRepository.findById(requestId)
                .orElseThrow(() -> new FiendshipRequestNotFoundException("friendship request not found: " + requestId));

        if (!friendship.getReceiver().getId().equals(currentUser.getId())) {
            throw new Forbidden("Нельзя отклонить чужую заявку");
        }

        if (friendship.getStatus() != PENDING) {
            throw new FriendshipAlreadyExistsException("Заявка уже обработана");
        }

        friendship.setStatus(DECLINED);
        return friendshipRepository.save(friendship);
    }

    public List<FriendRequestNotificationDto> getIncomingRequests() {
        User current = securityUtils.getCurrentUser();
        // фильтровать в коде хуже, чем в бд. бд = выдача данных, код = обработка данных
        return friendshipRepository.findAll().stream()
                .filter(f -> f.getReceiver().getId().equals(current.getId()) && f.getStatus() == PENDING)
                .map(f -> new FriendRequestNotificationDto(f.getId(), f.getRequester().getUsername(), f.getStatus().name()))
                .toList();
    }

    public List<UserSearchResponseDto> searchUsers(String query) {
        User current = securityUtils.getCurrentUser(); // нах тебе пользователь целиком, если ты только имя юзаешь
        if (query == null || query.isBlank()) {
            return List.of();
        }
        return userRepository.findTop5ByUsernameContainingIgnoreCaseAndUsernameNot(query, current.getUsername())
                .stream()
                .map(u -> new UserSearchResponseDto(u.getUsername()))
                .toList();
    }

    public List<String> getFriends() {
        User current = securityUtils.getCurrentUser();
        return friendshipRepository.findAcceptedForUser(current).stream()
                .flatMap(f -> {
                    if (f.getRequester().getId().equals(current.getId())) {
                        return Stream.of(f.getReceiver().getUsername());
                    } else {
                        return Stream.of(f.getRequester().getUsername());
                    }
                })
                .distinct()
                .toList();
    }
}
