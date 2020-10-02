package com.mentormate.hackathon.controller.handler.exception;

/**
 * {@link ForbiddenException} will throw when the operation is forbidden
 * 
 * Created by Vladislav Penchev on 2020/10/02
 */
public class ForbiddenException extends RuntimeException{
    public ForbiddenException(String message) {
        super(message);
    }
}
