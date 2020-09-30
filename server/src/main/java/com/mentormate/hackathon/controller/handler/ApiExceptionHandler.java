package com.mentormate.hackathon.controller.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

/**
 * The exception handler
 *
 * @author Polina Usheva
 */
@ControllerAdvice
public class ApiExceptionHandler {

  /**
   * Handles binding errors.
   *
   * @param ex the BindException
   * @return the response entity with error message and status code 400
   */
  @ExceptionHandler(BindException.class)
  public ResponseEntity<BindingExceptionResponse> handleException(BindException ex) {
    BindingExceptionResponse error =
        new BindingExceptionResponse(
            HttpStatus.BAD_REQUEST.value(),
            ex.getBindingResult(),
            LocalDateTime.now(ZoneOffset.UTC));

    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }

  /**
   * Handles validation exceptions.
   *
   * @param ex the MethodArgumentNotValidException
   * @return the response entity with error message and status code 400
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Object> handleException(MethodArgumentNotValidException ex) {
    BindingExceptionResponse error =
        new BindingExceptionResponse(
            HttpStatus.BAD_REQUEST.value(),
            ex.getBindingResult(),
            LocalDateTime.now(ZoneOffset.UTC));
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }
}
