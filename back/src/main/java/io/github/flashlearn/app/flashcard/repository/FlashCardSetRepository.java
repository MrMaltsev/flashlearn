package io.github.flashlearn.app.flashcard.repository;

import io.github.flashlearn.app.flashcard.entity.FlashCardSet;
import io.github.flashlearn.app.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FlashCardSetRepository extends JpaRepository<FlashCardSet, Long> {
    List<FlashCardSet> findAllByOwner_Id(Long ownerId);
}
