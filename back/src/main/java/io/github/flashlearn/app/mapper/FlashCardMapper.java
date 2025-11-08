package io.github.flashlearn.app.mapper;

import io.github.flashlearn.app.dto.flashcard.FlashCardResponse;
import io.github.flashlearn.app.entity.FlashCard;
import org.springframework.stereotype.Component;

@Component
public class FlashCardMapper {

    public FlashCardResponse toResponse(FlashCard entity) {
        return new FlashCardResponse(entity.getId(), entity.getQuestion(), entity.getAnswer());
    }
}
