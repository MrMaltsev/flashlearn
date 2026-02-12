package io.github.flashlearn.app.flashcard.mapper;

import io.github.flashlearn.app.flashcard.dto.EditFlashCardSetRequest;
import io.github.flashlearn.app.flashcard.dto.FlashCardResponse;
import io.github.flashlearn.app.flashcard.dto.FlashCardSetResponse;
import io.github.flashlearn.app.flashcard.dto.SaveFlashCardSetResponse;
import io.github.flashlearn.app.flashcard.entity.FlashCard;
import io.github.flashlearn.app.flashcard.entity.FlashCardSet;
import io.github.flashlearn.app.flashcard.entity.Visibility;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-12T15:06:23+0300",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.45.0.v20260128-0750, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class FlashCardSetMapperImpl implements FlashCardSetMapper {

    @Override
    public FlashCardSetResponse toFlashCardSetResponse(FlashCardSet flashCardSet) {
        if ( flashCardSet == null ) {
            return null;
        }

        boolean isSaved = false;
        Long id = null;
        String title = null;
        String description = null;
        Visibility visibility = null;
        List<String> tags = null;
        List<FlashCardResponse> flashCards = null;

        isSaved = flashCardSet.isSaved();
        id = flashCardSet.getId();
        title = flashCardSet.getTitle();
        description = flashCardSet.getDescription();
        visibility = flashCardSet.getVisibility();
        List<String> list = flashCardSet.getTags();
        if ( list != null ) {
            tags = new ArrayList<String>( list );
        }
        flashCards = flashCardListToFlashCardResponseList( flashCardSet.getFlashCards() );

        FlashCardSetResponse flashCardSetResponse = new FlashCardSetResponse( id, title, description, visibility, tags, isSaved, flashCards );

        return flashCardSetResponse;
    }

    @Override
    public FlashCardSet toFlashCardSet(EditFlashCardSetRequest flashCardSetResponse) {
        if ( flashCardSetResponse == null ) {
            return null;
        }

        FlashCardSet flashCardSet = new FlashCardSet();

        flashCardSet.setDescription( flashCardSetResponse.description() );
        flashCardSet.setFlashCards( flashCardResponseListToFlashCardList( flashCardSetResponse.flashCards() ) );
        if ( flashCardSetResponse.id() != null ) {
            flashCardSet.setId( flashCardSetResponse.id() );
        }
        List<String> list1 = flashCardSetResponse.tags();
        if ( list1 != null ) {
            flashCardSet.setTags( new ArrayList<String>( list1 ) );
        }
        flashCardSet.setTitle( flashCardSetResponse.title() );
        flashCardSet.setVisibility( flashCardSetResponse.visibility() );

        return flashCardSet;
    }

    @Override
    public SaveFlashCardSetResponse toSaveFlashCardSetResponse(FlashCardSet flashCardSet) {
        if ( flashCardSet == null ) {
            return null;
        }

        boolean isSaved = false;

        isSaved = flashCardSet.isSaved();

        SaveFlashCardSetResponse saveFlashCardSetResponse = new SaveFlashCardSetResponse( isSaved );

        return saveFlashCardSetResponse;
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

        flashCard.setAnswer( flashCardResponse.answer() );
        flashCard.setId( flashCardResponse.id() );
        flashCard.setQuestion( flashCardResponse.question() );

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
