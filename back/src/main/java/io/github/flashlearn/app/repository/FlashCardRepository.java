package io.github.flashlearn.app.repository;

import io.github.flashlearn.app.entity.FlashCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashCardRepository extends JpaRepository<FlashCard, Long> {
    boolean existsByQuestionAndAnswer(String question, String answer);
}
