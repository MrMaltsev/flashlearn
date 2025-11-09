package io.github.flashlearn.app.flashcard.controller;

import io.github.flashlearn.app.flashcard.dto.CreateFlashCardRequest;
import io.github.flashlearn.app.flashcard.dto.FlashCardResponse;
import io.github.flashlearn.app.flashcard.entity.FlashCard;
import io.github.flashlearn.app.flashcard.mapper.FlashCardMapper;
import io.github.flashlearn.app.flashcard.service.FlashCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/flashcards")
public class FlashCardController {

    private final FlashCardService flashCardService;
    private final FlashCardMapper mapper;

    /**
     * Создание новой флешкарты. Требуется аутентификация.
     * Карточка автоматически привязывается к текущему пользователю.
     */
    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()") // Проверяем, что пользователь аутентифицирован
    public ResponseEntity<FlashCardResponse> createFlashCard(@Valid @RequestBody CreateFlashCardRequest request) {
        FlashCard createdCard = flashCardService.createFlashCard(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toResponse(createdCard));
    }

    /**
     * Редактирование флешкарты. Требуется аутентификация.
     * Пользователь может редактировать только свои карточки (проверка в сервисе).
     */
    @PutMapping("/edit/{id}")
    @PreAuthorize("isAuthenticated()") // Проверяем, что пользователь аутентифицирован
    public ResponseEntity<FlashCardResponse> editFlashCard(
            @PathVariable Long id,
            @Valid @RequestBody CreateFlashCardRequest request) {

        FlashCard response = flashCardService.editFlashCard(id, request);

        return ResponseEntity.ok().body(mapper.toResponse(response));
    }

    /**
     * Удаление флешкарты. Требуется аутентификация.
     * Пользователь может удалять только свои карточки (проверка в сервисе).
     */
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("isAuthenticated()") // Проверяем, что пользователь аутентифицирован
    public ResponseEntity<Void> deleteFlashCard(@PathVariable Long id) {
        flashCardService.deleteFlashCard(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Получение флешкарты по идентификатору. Требуется аутентификация.
     * Пользователь может просматривать только свои карточки (проверка в сервисе).
     */
    @GetMapping("/get/{id}")
    @PreAuthorize("isAuthenticated()") // Проверяем, что пользователь аутентифицирован
    public ResponseEntity<FlashCardResponse> getFlashCard(@PathVariable Long id) {
        FlashCard flashCard = flashCardService.findFlashCard(id);
        return ResponseEntity.ok().body(mapper.toResponse(flashCard));
    }

    /**
     * Получение всех флешкарт текущего пользователя. Требуется аутентификация.
     * Пользователь получает только свои карточки.
     * @param userId идентификатор пользователя (используется для проверки, что пользователь запрашивает свои карточки)
     */
    @GetMapping("/getAll/{userId}")
    @PreAuthorize("isAuthenticated()") // Проверяем, что пользователь аутентифицирован
    public ResponseEntity<List<FlashCardResponse>> getAllFlashCards(@PathVariable Long userId) {
        // Сервис проверяет, что userId соответствует текущему аутентифицированному пользователю
        List<FlashCardResponse> flashCards = flashCardService.getAllFlashCardsByUserId(userId)
                .stream()
                .map(mapper::toResponse)
                .toList();

        return ResponseEntity.ok(flashCards);
    }
}
