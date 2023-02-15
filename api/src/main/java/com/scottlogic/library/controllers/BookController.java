package com.scottlogic.library.controllers;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scottlogic.library.data.BookRepository;
import com.scottlogic.library.models.Book;

@RestController
@RequestMapping("books")
public class BookController {
	@Autowired
	BookRepository bookRepository;

	@GetMapping()
	public Iterable<Book> getAll() {
		return bookRepository.findAll();
	}

	@GetMapping("{id}")
	public Optional<Book> getBook(@PathVariable String id) {
		var uuid = UUID.fromString(id);
		return bookRepository.findById(uuid);
	}
}
