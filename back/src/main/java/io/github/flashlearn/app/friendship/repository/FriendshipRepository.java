package io.github.flashlearn.app.friendship.repository;

import io.github.flashlearn.app.friendship.entity.Friendship;
import io.github.flashlearn.app.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    @Query("select f from Friendship f where (f.requester = :u1 and f.receiver = :u2) or (f.requester = :u2 and f.receiver = :u1)")
    Optional<Friendship> findBetween(@Param("u1") User u1, @Param("u2") User u2);

    @Query("select f from Friendship f where (f.requester = :user or f.receiver = :user) and f.status = 'ACCEPTED'")
    List<Friendship> findAcceptedForUser(@Param("user") User user);
}
