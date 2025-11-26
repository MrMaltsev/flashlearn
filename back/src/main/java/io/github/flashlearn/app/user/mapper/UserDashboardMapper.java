package io.github.flashlearn.app.user.mapper;

import io.github.flashlearn.app.user.dto.UserDashboardResponseDto;
import io.github.flashlearn.app.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface UserDashboardMapper {

    UserDashboardResponseDto toUserResponseDto(User user);

}
