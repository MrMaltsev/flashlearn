package io.github.flashlearn.app.user.exception;

import lombok.Getter;

@Getter
public class UserNotFoundException extends RuntimeException {

    private final Object key;

    public UserNotFoundException(String username) {
        super("User with username '" + username + "' not found");
        this.key = username;
    }

    public UserNotFoundException(Long id){
        super("User with id '" + id + "' not found");
        this.key = id;
    }
}
