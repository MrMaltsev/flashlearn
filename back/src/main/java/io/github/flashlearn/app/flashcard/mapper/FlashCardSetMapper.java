package io.github.flashlearn.app.flashcard.mapper;

import io.github.flashlearn.app.flashcard.dto.FlashCardSetResponse;
import io.github.flashlearn.app.flashcard.entity.FlashCardSet;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface FlashCardSetMapper {
    FlashCardSetResponse toFlashCardSetResponse(FlashCardSet flashCardSet);
}
