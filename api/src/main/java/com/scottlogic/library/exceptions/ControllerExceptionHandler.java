package com.scottlogic.library.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler({ NotFoundException.class })
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorMessage resourceNotFoundException(NotFoundException ex) {
    return createErrorMessage(ex, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler({ BadRequestException.class })
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorMessage badRequestException(BadRequestException ex) {
    return createErrorMessage(ex, HttpStatus.BAD_REQUEST);
  }

  private ErrorMessage createErrorMessage(RuntimeException exception, HttpStatus status) {
    return new ErrorMessage(status.value(), LocalDateTime.now(), exception.getMessage());
  }
}