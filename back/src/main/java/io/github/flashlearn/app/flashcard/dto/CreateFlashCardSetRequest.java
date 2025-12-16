package io.github.flashlearn.app.flashcard.dto;

import io.github.flashlearn.app.flashcard.entity.Visibility;

import java.util.List;

public record CreateFlashCardSetRequest(
        String title,
        String description,
        Visibility visibility,
        List<CreateFlashCardRequest> flashCards
) { }
