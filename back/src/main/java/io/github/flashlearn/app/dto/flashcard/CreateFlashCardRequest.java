package io.github.flashlearn.app.dto.flashcard;

import io.github.flashlearn.app.entity.Type;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateFlashCardRequest {

    @NotBlank
    private String question;

    @NotBlank
    private String answer;

    private Type type;
}
