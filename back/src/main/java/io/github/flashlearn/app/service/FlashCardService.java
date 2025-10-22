package io.github.flashlearn.app.service;

import io.github.flashlearn.app.dto.CreateFlashCardRequest;
import io.github.flashlearn.app.dto.FlashCardResponse;
import io.github.flashlearn.app.entity.FlashCard;
import io.github.flashlearn.app.entity.Type;
import io.github.flashlearn.app.entity.User;
import io.github.flashlearn.app.exception.FlashCardAlreadyExists;
import io.github.flashlearn.app.exception.FlashCardNotFound;
import io.github.flashlearn.app.exception.UserNotFoundException;
import io.github.flashlearn.app.mapper.FlashCardMapper;
import io.github.flashlearn.app.repository.FlashCardRepository;
import io.github.flashlearn.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
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
            throw new FlashCardAlreadyExists("This flash card already exists");
        }

        return flashCardRepository.save(newCard);
    }

    public FlashCard editFlashCard(Long id, CreateFlashCardRequest request) {
        FlashCard flashCard = flashCardRepository.findById(id)
                .orElseThrow(() -> new FlashCardNotFound("FlashCard not found with id" + id));

        flashCard.setQuestion(request.getQuestion());
        flashCard.setAnswer(request.getAnswer());
        flashCard.setType(request.getType());

        return flashCardRepository.save(flashCard);
    }

    public void deleteFlashCard(Long id) {
        FlashCard flashCard = flashCardRepository.findById(id)
                .orElseThrow(() -> new FlashCardNotFound("Flashcard with id not found, id: " + id));

        flashCardRepository.deleteById(id);
    }

    public FlashCard findFlashCard(Long id) {
        return flashCardRepository.findById(id)
                .orElseThrow(() -> new FlashCardNotFound("FlashCard with id not found" + id));
    }

    public List<FlashCard> getAllFlashCardsByUserId(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id not found, id: " + id));

        return flashCardRepository.findByOwner(user);
    }

}
