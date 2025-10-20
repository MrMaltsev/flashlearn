package io.github.flashlearn.app.controller;

import io.github.flashlearn.app.dto.CreateFlashCardRequest;
import io.github.flashlearn.app.dto.FlashCardResponse;
import io.github.flashlearn.app.entity.FlashCard;
import io.github.flashlearn.app.mapper.FlashCardMapper;
import io.github.flashlearn.app.service.FlashCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/flashcards")
public class FlashCardController {

    private final FlashCardService flashCardService;
    private final FlashCardMapper mapper;

    @PostMapping("/create")
    public ResponseEntity<FlashCardResponse> createFlashCard(@Valid @RequestBody CreateFlashCardRequest request) {
        FlashCard createdCard = flashCardService.createFlashCard(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toResponse(createdCard));
    }
}
