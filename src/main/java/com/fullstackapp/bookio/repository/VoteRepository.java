package com.fullstackapp.bookio.repository;

import com.fullstackapp.bookio.model.Book;
import com.fullstackapp.bookio.model.User;
import com.fullstackapp.bookio.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findTopByBookAndUserOrderByVoteIdDesc(Book book, User currentUser);
}
