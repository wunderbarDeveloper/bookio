package com.fullstackapp.bookio.service;

import com.fullstackapp.bookio.dto.CommentsDto;
import com.fullstackapp.bookio.exception.BookNotFoundException;
import com.fullstackapp.bookio.mapper.CommentMapper;
import com.fullstackapp.bookio.model.Book;
import com.fullstackapp.bookio.model.Comment;
import com.fullstackapp.bookio.model.User;
import com.fullstackapp.bookio.repository.BookRepository;
import com.fullstackapp.bookio.repository.CommentRepository;
import com.fullstackapp.bookio.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
public class CommentService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;

    public void save(CommentsDto commentsDto){
        Book book = bookRepository.findById(commentsDto.getBookId())
                .orElseThrow(() -> new BookNotFoundException(commentsDto.getBookId().toString()));
        Comment comment = commentMapper.map(commentsDto, book, authService.getCurrentUser());
        commentRepository.save(comment);

    }

    public List<CommentsDto> getAllCommentsForBook(Long postId) {
        Book book = bookRepository.findById(postId).orElseThrow(() -> new BookNotFoundException(postId.toString()));
        return commentRepository.findByBook(book)
                .stream()
                .map(commentMapper::mapToDto).collect(toList());
    }

    public List<CommentsDto> getAllCommentsForUser(String userName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException(userName));
        return commentRepository.findAllByUser(user)
                .stream()
                .map(commentMapper::mapToDto)
                .collect(toList());
    }
}

