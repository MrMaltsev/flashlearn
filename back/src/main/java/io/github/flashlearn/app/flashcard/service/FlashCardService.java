package io.github.flashlearn.app.flashcard.service;

import io.github.flashlearn.app.auth.security.SecurityUtils;
import io.github.flashlearn.app.flashcard.dto.CreateFlashCardRequest;
import io.github.flashlearn.app.flashcard.entity.FlashCard;
import io.github.flashlearn.app.flashcard.entity.Type;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.flashcard.exception.FlashCardAlreadyExistsException;
import io.github.flashlearn.app.flashcard.exception.FlashCardNotFoundException;
import io.github.flashlearn.app.flashcard.exception.UnauthorizedAccessException;
import io.github.flashlearn.app.flashcard.repository.FlashCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashCardService {

    private final FlashCardRepository flashCardRepository;
    private final SecurityUtils securityUtils;

    /**
     * Создает новую флешкарту для текущего аутентифицированного пользователя
     * @param request данные для создания карточки
     * @return созданная флешкарта
     */
    public FlashCard createFlashCard(CreateFlashCardRequest request) {
        // Получаем текущего аутентифицированного пользователя
        User currentUser = securityUtils.getCurrentUser();
        
        String question = request.getQuestion();
        String answer = request.getAnswer();
        Type type = request.getType();

        // Проверяем, не существует ли уже карточка с такими же вопросом и ответом у этого пользователя
        if(flashCardRepository.existsByQuestionAndAnswerAndOwner(question, answer, currentUser)) {
            throw new FlashCardAlreadyExistsException("This flash card already exists");
        }

        // Создаем новую карточку и устанавливаем владельца
        FlashCard newCard = new FlashCard(question, answer, type);
        newCard.setOwner(currentUser);

        return flashCardRepository.save(newCard);
    }

    /**
     * Редактирует флешкарту. Пользователь может редактировать только свои карточки.
     * @param id идентификатор карточки
     * @param request новые данные для карточки
     * @return отредактированная флешкарта
     * @throws UnauthorizedAccessException если пользователь пытается редактировать чужую карточку
     */
    public FlashCard editFlashCard(Long id, CreateFlashCardRequest request) {
        FlashCard flashCard = flashCardRepository.findById(id)
                .orElseThrow(() -> new FlashCardNotFoundException("FlashCard not found with id" + id));

        // Получаем текущего аутентифицированного пользователя
        User currentUser = securityUtils.getCurrentUser();
        
        // Проверяем, что текущий пользователь является владельцем карточки
        if (!flashCard.getOwner().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("У вас нет прав для редактирования этой карточки");
        }

        flashCard.setQuestion(request.getQuestion());
        flashCard.setAnswer(request.getAnswer());
        flashCard.setType(request.getType());

        return flashCardRepository.save(flashCard);
    }

    /**
     * Удаляет флешкарту. Пользователь может удалять только свои карточки.
     * @param id идентификатор карточки
     * @throws UnauthorizedAccessException если пользователь пытается удалить чужую карточку
     */
    public void deleteFlashCard(Long id) {
        FlashCard flashCard = flashCardRepository.findById(id)
                .orElseThrow(() -> new FlashCardNotFoundException("Flashcard with id not found, id: " + id));

        // Получаем текущего аутентифицированного пользователя
        User currentUser = securityUtils.getCurrentUser();
        
        // Проверяем, что текущий пользователь является владельцем карточки
        if (!flashCard.getOwner().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("У вас нет прав для удаления этой карточки");
        }

        flashCardRepository.deleteById(id);
    }

    /**
     * Находит флешкарту по идентификатору. Пользователь может просматривать только свои карточки.
     * @param id идентификатор карточки
     * @return найденная флешкарта
     * @throws UnauthorizedAccessException если пользователь пытается просмотреть чужую карточку
     */
    public FlashCard findFlashCard(Long id) {
        FlashCard flashCard = flashCardRepository.findById(id)
                .orElseThrow(() -> new FlashCardNotFoundException("FlashCard with id not found" + id));

        // Получаем текущего аутентифицированного пользователя
        User currentUser = securityUtils.getCurrentUser();
        
        // Проверяем, что текущий пользователь является владельцем карточки
        if (!flashCard.getOwner().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("У вас нет прав для просмотра этой карточки");
        }

        return flashCard;
    }

    /**
     * Получает все флешкарты пользователя. Пользователь может получить только свои карточки.
     * @param userId идентификатор пользователя
     * @return список флешкарт пользователя
     * @throws UnauthorizedAccessException если пользователь пытается получить карточки другого пользователя
     */
    public List<FlashCard> getAllFlashCardsByUserId(Long userId) {
        // Получаем текущего аутентифицированного пользователя
        User currentUser = securityUtils.getCurrentUser();
        
        // Проверяем, что пользователь запрашивает свои собственные карточки
        if (!currentUser.getId().equals(userId)) {
            throw new UnauthorizedAccessException("У вас нет прав для просмотра карточек другого пользователя");
        }

        return flashCardRepository.findByOwner(currentUser);
    }

}
