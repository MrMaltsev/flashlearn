package io.github.flashlearn.app.exception;

public class FlashCardAlreadyExists extends RuntimeException {
    public FlashCardAlreadyExists(String message) {
        super(message);
    }
}
