package io.github.flashlearn.app.friendship.mapper;

import io.github.flashlearn.app.friendship.dto.FriendRequestResponseDto;
import io.github.flashlearn.app.friendship.entity.Friendship;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-17T11:30:38+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class FriendshipMapperImpl implements FriendshipMapper {

    @Override
    public FriendRequestResponseDto toFriendRequestResponseDto(Friendship friendship) {
        if ( friendship == null ) {
            return null;
        }

        String status = null;

        if ( friendship.getStatus() != null ) {
            status = friendship.getStatus().name();
        }

        Long friendshipId = null;

        FriendRequestResponseDto friendRequestResponseDto = new FriendRequestResponseDto( friendshipId, status );

        return friendRequestResponseDto;
    }
}
