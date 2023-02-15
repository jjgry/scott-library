package com.scottlogic.library.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scottlogic.library.Services.BookService;
import com.scottlogic.library.exceptions.BadRequestException;
import com.scottlogic.library.models.Book;

@RestController
@RequestMapping("books")
public class BookController {
	@Autowired
	BookService bookService;

	@GetMapping()
	public List<Book> getAll() {
		return bookService.getAll();
	}

	@GetMapping("{id}")
	public Book get(@PathVariable UUID id) {
		return bookService.get(id);
	}

	@PostMapping("{id}")
	public Book create(@RequestBody Book book) {
		return bookService.create(book);
	}

	@PutMapping("{id}")
	public Book update(@PathVariable UUID id, @RequestBody Book changes) {
		if (!id.equals(changes.id)) {
			throw new BadRequestException("ID in query does not match ID in body");
		}

		return bookService.update(changes);
	}

	@DeleteMapping("{id}")
	public Book delete(@PathVariable UUID id) {
		return bookService.delete(id);
	}
}
