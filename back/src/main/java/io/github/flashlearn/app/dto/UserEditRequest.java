package io.github.flashlearn.app.dto;

import lombok.Data;

@Data
public class UserEditRequest {
    private String username;
    private String email;
}
