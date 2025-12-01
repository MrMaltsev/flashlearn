package io.github.flashlearn.app.flashcard.dto;

import java.util.List;

public record CreateFlashCardSetRequest(
        String title,
        String description,
        List<CreateFlashCardRequest> flashCards
) { }
