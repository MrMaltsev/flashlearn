package io.github.flashlearn.app.user.exception;

public class UserNotFoundException extends RuntimeException {

    private final String username;

    public UserNotFoundException(String username) {
        super("User with username '" + username + "' not found");
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
