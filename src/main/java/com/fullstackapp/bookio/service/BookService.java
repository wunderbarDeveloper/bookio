package com.fullstackapp.bookio.service;

import com.fullstackapp.bookio.exception.BookioException;
import com.fullstackapp.bookio.model.Book;
import com.fullstackapp.bookio.repository.BookRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class BookService {

    private final BookRepository bookRepository;

    @Transactional
    public Book save(Book book){
        Book newBook = bookRepository.save(book);
        return newBook;
    }

    @Transactional
    public List<Book> getAll() {
       return bookRepository.findAll();
    }

    public Book getBook(Long id){
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookioException("No book with ID - " + id));
        return book;
    }

    @Transactional
    public Book updateBook(Book book){
        return bookRepository.save(book);
    }

    @Transactional
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
