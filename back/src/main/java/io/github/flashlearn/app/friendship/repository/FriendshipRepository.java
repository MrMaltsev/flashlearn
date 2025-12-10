package io.github.flashlearn.app.friendship.repository;

import io.github.flashlearn.app.friendship.entity.Friendship;
import io.github.flashlearn.app.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    //boolean existsByUsers(User requester, User receiver);
}
