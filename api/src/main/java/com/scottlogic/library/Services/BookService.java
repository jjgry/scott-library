package com.scottlogic.library.Services;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scottlogic.library.data.BookRepository;
import com.scottlogic.library.exceptions.NotFoundException;
import com.scottlogic.library.models.Book;

@Service
public class BookService implements ICrudService<Book, UUID> {
  @Autowired
  BookRepository bookRepository;

  @Override
  public List<Book> getAll() {
    return bookRepository.findAll();
  }

  @Override
  public Book get(UUID id) {
    var optional = bookRepository.findById(id);

    if (optional.isEmpty()) {
      throw new NotFoundException();
    }

    return optional.get();
  }

  @Override
  public Book create(Book newBook) {
    newBook.id = UUID.randomUUID();

    if (!newBook.borrower.isBlank())
      newBook.loanedAt = Instant.now();

    Book created = bookRepository.save(newBook);
    return created;
  }

  @Override
  public Book update(Book changes) {
    var existing = bookRepository.findById(changes.id);

    if (existing.isEmpty()) {
      throw new NotFoundException();
    }

    var toUpdate = existing.get();

    toUpdate.title = changes.title;
    toUpdate.isbn = changes.isbn;
    toUpdate.authors = changes.authors;
    toUpdate.locations = changes.locations;

    // New user takes book
    if (!changes.borrower.isBlank() && toUpdate.borrower != changes.borrower) {
      toUpdate.borrower = changes.borrower;
      toUpdate.loanedAt = Instant.now();
    }

    // Book is returned to library
    if (changes.borrower.isBlank()) {
      toUpdate.borrower = null;
      toUpdate.loanedAt = null;
    }

    var updated = bookRepository.saveAndFlush(existing.get());
    return updated;
  }

  @Override
  public Book delete(UUID id) {
    var book = get(id);
    bookRepository.deleteById(id);
    return book;
  }
}
