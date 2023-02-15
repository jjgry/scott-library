package com.scottlogic.library.data;

import java.util.UUID;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.scottlogic.library.models.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
}
