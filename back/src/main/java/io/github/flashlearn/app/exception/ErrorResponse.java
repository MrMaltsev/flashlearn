package io.github.flashlearn.app.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

// Class for better visual output
@Data
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timeStamp;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.timeStamp = LocalDateTime.now();
    }
}
