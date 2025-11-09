package io.github.flashlearn.app.flashcard.service;

import io.github.flashlearn.app.flashcard.dto.CreateFlashCardRequest;
import io.github.flashlearn.app.flashcard.entity.FlashCard;
import io.github.flashlearn.app.flashcard.entity.Type;
import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.flashcard.exception.FlashCardAlreadyExistsException;
import io.github.flashlearn.app.flashcard.exception.FlashCardNotFoundException;
import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.flashcard.repository.FlashCardRepository;
import io.github.flashlearn.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashCardService {

    private final FlashCardRepository flashCardRepository;
    private final UserRepository userRepository;

    public FlashCard createFlashCard(CreateFlashCardRequest request) {
        String question = request.getQuestion();
        String answer = request.getAnswer();
        Type type = request.getType();

        FlashCard newCard = new FlashCard(question, answer, type);

        if(flashCardRepository.existsByQuestionAndAnswer(question, answer)) {
            throw new FlashCardAlreadyExistsException("This flash card already exists");
        }

        return flashCardRepository.save(newCard);
    }

    public FlashCard editFlashCard(Long id, CreateFlashCardRequest request) {
        FlashCard flashCard = flashCardRepository.findById(id)
                .orElseThrow(() -> new FlashCardNotFoundException("FlashCard not found with id" + id));

        flashCard.setQuestion(request.getQuestion());
        flashCard.setAnswer(request.getAnswer());
        flashCard.setType(request.getType());

        return flashCardRepository.save(flashCard);
    }

    public void deleteFlashCard(Long id) {
        FlashCard flashCard = flashCardRepository.findById(id)
                .orElseThrow(() -> new FlashCardNotFoundException("Flashcard with id not found, id: " + id));

        flashCardRepository.deleteById(id);
    }

    public FlashCard findFlashCard(Long id) {
        return flashCardRepository.findById(id)
                .orElseThrow(() -> new FlashCardNotFoundException("FlashCard with id not found" + id));
    }

    public List<FlashCard> getAllFlashCardsByUserId(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id not found, id: " + id));

        return flashCardRepository.findByOwner(user);
    }

}
