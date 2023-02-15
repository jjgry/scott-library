package com.scottlogic.library.exceptions;

public class NotFoundException extends RuntimeException {
  public NotFoundException() {
    super("Resource not found");
  }
}
