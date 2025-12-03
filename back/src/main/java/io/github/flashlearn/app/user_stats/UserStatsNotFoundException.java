package io.github.flashlearn.app.user_stats;

public class UserStatsNotFoundException extends RuntimeException {
    public UserStatsNotFoundException(String message) {
        super(message);
    }
}
