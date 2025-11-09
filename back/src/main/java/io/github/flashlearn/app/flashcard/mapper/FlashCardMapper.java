package io.github.flashlearn.app.flashcard.mapper;

import io.github.flashlearn.app.flashcard.dto.FlashCardResponse;
import io.github.flashlearn.app.flashcard.entity.FlashCard;
import org.springframework.stereotype.Component;

@Component
public class FlashCardMapper {

    public FlashCardResponse toResponse(FlashCard entity) {
        return new FlashCardResponse(entity.getId(), entity.getQuestion(), entity.getAnswer());
    }
}
