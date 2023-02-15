package com.scottlogic.library.exceptions;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ErrorMessage {

  private final int status;
  private final LocalDateTime timestamp;
  private final String message;
}
