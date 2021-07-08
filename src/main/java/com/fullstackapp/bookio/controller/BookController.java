package com.fullstackapp.bookio.controller;

import com.fullstackapp.bookio.model.Book;
import com.fullstackapp.bookio.service.BookService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@AllArgsConstructor
@Slf4j
public class BookController {

    private final BookService bookService;

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(bookService.save(book));
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookService.getBook(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> updateBook(@RequestBody Book book){
        Book updatedBook = bookService.updateBook(book);
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
