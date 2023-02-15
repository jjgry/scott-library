package com.scottlogic.library.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  public UUID id;

  @Getter
  @Setter
  public String title;
}
