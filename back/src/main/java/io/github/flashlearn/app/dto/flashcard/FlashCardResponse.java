package io.github.flashlearn.app.dto.flashcard;

import io.github.flashlearn.app.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FlashCardResponse {
    private Long id;
    private String question;
    private String answer;
    private Type type;
    private LocalDateTime creationTime;

//    public FlashCardResponse(FlashCard flashCard) {
//        this.id = flashCard.getId();
//        this.question = flashCard.getQuestion();
//        this.answer = flashCard.getAnswer();
//        this.type = flashCard.getType();
//        this.creationTime = flashCard.getCreationTime();
//    }

    public FlashCardResponse(Long id, String question, String answer) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }
}
