package io.github.flashlearn.app.flashcard.dto;

import java.util.List;

public record EditFlashCardSetRequest(
        Long id,
        String title,
        String description,
        List<FlashCardResponse> flashCards
) { }
