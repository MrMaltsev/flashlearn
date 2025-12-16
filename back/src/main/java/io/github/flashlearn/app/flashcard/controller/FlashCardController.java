package io.github.flashlearn.app.flashcard.controller;

import io.github.flashlearn.app.flashcard.dto.CreateFlashCardSetRequest;
import io.github.flashlearn.app.flashcard.dto.EditFlashCardSetRequest;
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

import java.util.List;

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

    /**
     * Получение всех флешкарт текущего пользователя. Требуется аутентификация.
     * Пользователь получает только свои карточки.
     * @param username идентификатор пользователя (используется для проверки, что пользователь запрашивает свои карточки)
     */
    @GetMapping("/{username}")
    @PreAuthorize("isAuthenticated()") // Проверяем, что пользователь аутентифицирован
    public ResponseEntity<List<FlashCardSetResponse>> getAllFlashCards(@PathVariable String username) {
        // Сервис проверяет, что userId соответствует текущему аутентифицированному пользователю
        List<FlashCardSetResponse> flashCards = flashCardService.getAllFlashCardSets(username)
                .stream()
                .map(mapper::toFlashCardSetResponse)
                .toList();

        return ResponseEntity.ok(flashCards);
    }

    @GetMapping("/getSet/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FlashCardSetResponse> getFlashCardSet(@PathVariable Long id) {
        FlashCardSetResponse flashCardSetResponse = mapper.toFlashCardSetResponse(flashCardService.getFlashCardSet(id));
        return ResponseEntity.status(HttpStatus.OK).body(flashCardSetResponse);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteFlashCardSet(@PathVariable Long id) {
        flashCardService.deleteFlashCardSet(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FlashCardSetResponse> editFlashCardSet(@RequestBody @Valid EditFlashCardSetRequest request,
                                                                     @PathVariable Long id) {
        FlashCardSet flashCardSet = flashCardService.editFlashCardSet(mapper.toFlashCardSet(request), id);
        return ResponseEntity.status(HttpStatus.OK).body(mapper.toFlashCardSetResponse(flashCardSet));
    }
}
