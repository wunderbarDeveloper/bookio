package com.fullstackapp.bookio.exception;

import org.springframework.mail.MailException;

public class BookioException extends RuntimeException {
    public BookioException(String exMessage, Exception e) {
        super(exMessage, e);
    }

    public BookioException(String exMessage) {
        super(exMessage);
    }
}
