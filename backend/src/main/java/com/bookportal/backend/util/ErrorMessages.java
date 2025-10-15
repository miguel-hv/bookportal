package com.bookportal.backend.util;

public enum ErrorMessages {
    USERNAME_EXISTS("Username already exists"),
    USER_REGISTERED("User registered successfully");

    private final String message;

    ErrorMessages(String message) { this.message = message; }

    public String getMessage() { return message; }
}
