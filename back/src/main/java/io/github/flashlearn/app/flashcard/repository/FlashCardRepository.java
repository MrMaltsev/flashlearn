package io.github.flashlearn.app.flashcard.repository;

import io.github.flashlearn.app.flashcard.entity.FlashCard;
import io.github.flashlearn.app.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlashCardRepository extends JpaRepository<FlashCard, Long> {
    boolean existsByQuestionAndAnswer(String question, String answer);
    List<FlashCard> findByOwner(User owner);
}
