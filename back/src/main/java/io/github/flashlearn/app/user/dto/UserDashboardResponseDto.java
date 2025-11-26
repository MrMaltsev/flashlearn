package io.github.flashlearn.app.user.dto;

import io.github.flashlearn.app.flashcard.entity.FlashCard;

import java.util.List;

public record UserDashboardResponseDto(
        String username,
        Integer streak,
        Integer dailyGoal,
        List<FlashCard> flashCards
) { }
