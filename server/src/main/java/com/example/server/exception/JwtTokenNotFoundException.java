package com.example.server.exception;

public class JwtTokenNotFoundException extends RuntimeException {
    private static final String ERROR_MESSAGE = "JWT token not found: %s";

    public JwtTokenNotFoundException(String token) {
        super(ERROR_MESSAGE.formatted(token));
    }
}
