package com.scottlogic.library.data;

import java.util.UUID;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import com.scottlogic.library.models.Book;

@Repository
public interface BookRepository extends CrudRepository<Book, UUID> {
}
