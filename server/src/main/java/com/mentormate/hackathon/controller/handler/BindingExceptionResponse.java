package com.mentormate.hackathon.controller.handler;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.BindingResult;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * A custom error response for binding errors
 *
 * @author Polina Usheva
 */
@Getter
@Setter
public class BindingExceptionResponse {
  private int status;
  private Map<String, String> errors;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
  private LocalDateTime timestamp;

  public BindingExceptionResponse(int status, BindingResult result, LocalDateTime timestamp) {
    this.status = status;
    this.timestamp = timestamp;
    Map<String, String> errorMap = new LinkedHashMap<>();
    result
        .getFieldErrors()
        .forEach(fieldError -> errorMap.put(fieldError.getField(), fieldError.getDefaultMessage()));
    this.errors = errorMap;
  }
}
