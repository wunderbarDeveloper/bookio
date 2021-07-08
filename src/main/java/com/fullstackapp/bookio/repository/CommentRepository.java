package com.fullstackapp.bookio.repository;

import com.fullstackapp.bookio.model.Book;
import com.fullstackapp.bookio.model.Comment;
import com.fullstackapp.bookio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBook(Book book);

    List<Comment> findAllByUser(User user);
}
