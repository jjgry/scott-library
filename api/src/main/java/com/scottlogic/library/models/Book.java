package com.scottlogic.library.models;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  public UUID id;

  public String title;

  public String isbn;

  public String[] locations;

  public String[] authors;
  
  public String borrower;

  public Instant loanedAt;
}
