package io.github.flashlearn.app.user_stats.exception;

public class UserStatsNotFoundException extends RuntimeException {
    public UserStatsNotFoundException(String message) {
        super(message);
    }
}
