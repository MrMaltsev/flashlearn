package io.github.flashlearn.app.flashcard.mapper;

import io.github.flashlearn.app.flashcard.dto.EditFlashCardSetRequest;
import io.github.flashlearn.app.flashcard.dto.FlashCardResponse;
import io.github.flashlearn.app.flashcard.dto.FlashCardSetResponse;
import io.github.flashlearn.app.flashcard.entity.FlashCard;
import io.github.flashlearn.app.flashcard.entity.FlashCardSet;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-12T15:26:11+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class FlashCardSetMapperImpl implements FlashCardSetMapper {

    @Override
    public FlashCardSetResponse toFlashCardSetResponse(FlashCardSet flashCardSet) {
        if ( flashCardSet == null ) {
            return null;
        }

        Long id = null;
        String title = null;
        String description = null;
        List<FlashCardResponse> flashCards = null;

        id = flashCardSet.getId();
        title = flashCardSet.getTitle();
        description = flashCardSet.getDescription();
        flashCards = flashCardListToFlashCardResponseList( flashCardSet.getFlashCards() );

        FlashCardSetResponse flashCardSetResponse = new FlashCardSetResponse( id, title, description, flashCards );

        return flashCardSetResponse;
    }

    @Override
    public FlashCardSet toFlashCardSet(EditFlashCardSetRequest flashCardSetResponse) {
        if ( flashCardSetResponse == null ) {
            return null;
        }

        FlashCardSet flashCardSet = new FlashCardSet();

        if ( flashCardSetResponse.id() != null ) {
            flashCardSet.setId( flashCardSetResponse.id() );
        }
        flashCardSet.setTitle( flashCardSetResponse.title() );
        flashCardSet.setDescription( flashCardSetResponse.description() );
        flashCardSet.setFlashCards( flashCardResponseListToFlashCardList( flashCardSetResponse.flashCards() ) );

        return flashCardSet;
    }

    protected FlashCardResponse flashCardToFlashCardResponse(FlashCard flashCard) {
        if ( flashCard == null ) {
            return null;
        }

        Long id = null;
        String question = null;
        String answer = null;

        id = flashCard.getId();
        question = flashCard.getQuestion();
        answer = flashCard.getAnswer();

        FlashCardResponse flashCardResponse = new FlashCardResponse( id, question, answer );

        return flashCardResponse;
    }

    protected List<FlashCardResponse> flashCardListToFlashCardResponseList(List<FlashCard> list) {
        if ( list == null ) {
            return null;
        }

        List<FlashCardResponse> list1 = new ArrayList<FlashCardResponse>( list.size() );
        for ( FlashCard flashCard : list ) {
            list1.add( flashCardToFlashCardResponse( flashCard ) );
        }

        return list1;
    }

    protected FlashCard flashCardResponseToFlashCard(FlashCardResponse flashCardResponse) {
        if ( flashCardResponse == null ) {
            return null;
        }

        FlashCard flashCard = new FlashCard();

        flashCard.setId( flashCardResponse.id() );
        flashCard.setQuestion( flashCardResponse.question() );
        flashCard.setAnswer( flashCardResponse.answer() );

        return flashCard;
    }

    protected List<FlashCard> flashCardResponseListToFlashCardList(List<FlashCardResponse> list) {
        if ( list == null ) {
            return null;
        }

        List<FlashCard> list1 = new ArrayList<FlashCard>( list.size() );
        for ( FlashCardResponse flashCardResponse : list ) {
            list1.add( flashCardResponseToFlashCard( flashCardResponse ) );
        }

        return list1;
    }
}
