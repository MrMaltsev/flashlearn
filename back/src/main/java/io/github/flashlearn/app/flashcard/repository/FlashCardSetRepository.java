package io.github.flashlearn.app.flashcard.repository;

import io.github.flashlearn.app.flashcard.entity.FlashCardSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashCardSetRepository extends JpaRepository<FlashCardSet, Long> {
}
