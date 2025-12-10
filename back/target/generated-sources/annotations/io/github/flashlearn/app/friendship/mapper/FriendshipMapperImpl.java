package io.github.flashlearn.app.friendship.mapper;

import io.github.flashlearn.app.friendship.dto.FriendRequestResponseDto;
import io.github.flashlearn.app.friendship.entity.Friendship;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-08T13:10:43+0300",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.9 (Eclipse Adoptium)"
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
