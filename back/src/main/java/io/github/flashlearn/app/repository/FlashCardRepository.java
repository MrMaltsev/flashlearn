package io.github.flashlearn.app.repository;

import io.github.flashlearn.app.entity.FlashCard;
import io.github.flashlearn.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlashCardRepository extends JpaRepository<FlashCard, Long> {
    boolean existsByQuestionAndAnswer(String question, String answer);
    List<FlashCard> findByOwner(User owner);
}
