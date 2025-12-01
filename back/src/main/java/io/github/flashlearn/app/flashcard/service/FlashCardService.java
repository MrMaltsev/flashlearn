package io.github.flashlearn.app.flashcard.service;

import io.github.flashlearn.app.auth.security.SecurityUtils;
import io.github.flashlearn.app.flashcard.dto.CreateFlashCardSetRequest;
import io.github.flashlearn.app.flashcard.dto.FlashCardResponse;
import io.github.flashlearn.app.flashcard.entity.FlashCard;
import io.github.flashlearn.app.flashcard.entity.FlashCardSet;
import io.github.flashlearn.app.flashcard.repository.FlashCardSetRepository;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.flashcard.exception.UnauthorizedAccessException;
import io.github.flashlearn.app.flashcard.repository.FlashCardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashCardService {

    private final FlashCardRepository flashCardRepository;
    private final FlashCardSetRepository flashCardSetRepository;
    private final SecurityUtils securityUtils;

    /**
     * Создает новую флешкарту для текущего аутентифицированного пользователя
     * @param request данные для создания карточки
     * @return созданная флешкарта
     */
    @Transactional
    public FlashCardSet createFlashCardSet(CreateFlashCardSetRequest request) {
        // Получаем текущего аутентифицированного пользователя
        User currentUser = securityUtils.getCurrentUser();
        FlashCardSet flashCardSet = new FlashCardSet();
        
        flashCardSet.setTitle(request.title());
        flashCardSet.setDescription(request.description());
        flashCardSet.setOwner(currentUser);
        flashCardSet.setCreatedAt(LocalDateTime.now());
        flashCardSet.setUpdatedAt(LocalDateTime.now());

        List<FlashCard> cards = request.flashCards().stream()
                .map(dto -> {
                    FlashCard card = new FlashCard();
                    card.setQuestion(dto.question());
                    card.setAnswer(dto.answer());
                    card.setSet(flashCardSet);
                    return card;
                })
                .toList();

        flashCardSet.setFlashCards(cards);

        return flashCardSetRepository.save(flashCardSet);
    }

//    /**
//     * Получает все флешкарты пользователя. Пользователь может получить только свои карточки.
//     * @param username идентификатор пользователя
//     * @return список флешкарт пользователя
//     * @throws UnauthorizedAccessException если пользователь пытается получить карточки другого пользователя
//     */
//    public List<FlashCard> getAllFlashCardsByUsername(String username) {
//        // Получаем текущего аутентифицированного пользователя
//        User currentUser = securityUtils.getCurrentUser();
//
//        // Проверяем, что пользователь запрашивает свои собственные карточки
//        if (!currentUser.getUsername().equals(username)) {
//            throw new UnauthorizedAccessException("У вас нет прав для просмотра карточек другого пользователя");
//        }
//
//        return flashCardRepository.findByOwner(currentUser);
//    }

}
