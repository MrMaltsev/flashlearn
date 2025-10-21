package io.github.flashlearn.app.service;

import io.github.flashlearn.app.dto.CreateFlashCardRequest;
import io.github.flashlearn.app.dto.FlashCardResponse;
import io.github.flashlearn.app.entity.FlashCard;
import io.github.flashlearn.app.entity.Type;
import io.github.flashlearn.app.exception.FlashCardAlreadyExists;
import io.github.flashlearn.app.exception.FlashCardNotFound;
import io.github.flashlearn.app.repository.FlashCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FlashCardService {

    private final FlashCardRepository flashCardRepository;

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

}
