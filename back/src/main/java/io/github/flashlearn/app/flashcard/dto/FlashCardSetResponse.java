package io.github.flashlearn.app.flashcard.dto;

import java.util.List;

public record FlashCardSetResponse(
        Long id,
        String title,
        String description,
        List<FlashCardResponse> flashCards
) { }
