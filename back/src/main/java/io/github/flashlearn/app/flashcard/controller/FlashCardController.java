package io.github.flashlearn.app.flashcard.controller;

import io.github.flashlearn.app.flashcard.dto.CreateFlashCardSetRequest;
import io.github.flashlearn.app.flashcard.dto.FlashCardSetResponse;
import io.github.flashlearn.app.flashcard.entity.FlashCardSet;
import io.github.flashlearn.app.flashcard.mapper.FlashCardSetMapper;
import io.github.flashlearn.app.flashcard.service.FlashCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/flashcards")
public class FlashCardController {

    private final FlashCardService flashCardService;
    private final FlashCardSetMapper mapper;

    /**
     * Создание новой флешкарты. Требуется аутентификация.
     * Карточка автоматически привязывается к текущему пользователю.
     */
    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()") // Проверяем, что пользователь аутентифицирован
    public ResponseEntity<FlashCardSetResponse> createFlashCardSet(@Valid @RequestBody CreateFlashCardSetRequest request) {
        FlashCardSet createdSet = flashCardService.createFlashCardSet(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toFlashCardSetResponse(createdSet));
    }

//    /**
//     * Получение всех флешкарт текущего пользователя. Требуется аутентификация.
//     * Пользователь получает только свои карточки.
//     * @param username идентификатор пользователя (используется для проверки, что пользователь запрашивает свои карточки)
//     */
//    @GetMapping("/getAll/{username}")
//    @PreAuthorize("isAuthenticated()") // Проверяем, что пользователь аутентифицирован
//    public ResponseEntity<List<FlashCardResponse>> getAllFlashCards(@PathVariable String username) {
//        // Сервис проверяет, что userId соответствует текущему аутентифицированному пользователю
//        List<FlashCardResponse> flashCards = flashCardService.getAllFlashCardsByUsername(username)
//                .stream()
//                .map(mapper::toResponse)
//                .toList();
//
//        return ResponseEntity.ok(flashCards);
//    }
}
