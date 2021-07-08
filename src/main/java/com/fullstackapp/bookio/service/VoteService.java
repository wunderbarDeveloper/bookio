package com.fullstackapp.bookio.service;

import com.fullstackapp.bookio.dto.VoteDto;
import com.fullstackapp.bookio.exception.BookNotFoundException;
import com.fullstackapp.bookio.exception.BookioException;
import com.fullstackapp.bookio.model.Book;
import com.fullstackapp.bookio.model.Vote;
import com.fullstackapp.bookio.model.VoteType;
import com.fullstackapp.bookio.repository.BookRepository;
import com.fullstackapp.bookio.repository.VoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.fullstackapp.bookio.model.VoteType.UPVOTE;

@Service
@AllArgsConstructor
public class VoteService {

        private final VoteRepository voteRepository;
        private final BookRepository bookRepository;
        private final AuthService authService;

        @Transactional
        public void vote(VoteDto voteDto) {
            Book book = bookRepository.findById(voteDto.getBookId())
                    .orElseThrow(() -> new BookNotFoundException("Book Not Found with ID - " + voteDto.getBookId()));
            Optional<Vote> voteByPostAndUser = voteRepository.findTopByBookAndUserOrderByVoteIdDesc(book, authService.getCurrentUser());
            if (voteByPostAndUser.isPresent() &&
                    voteByPostAndUser.get().getVoteType()
                            .equals(voteDto.getVoteType())) {
                throw new BookioException("You have already "
                        + voteDto.getVoteType() + "'d for this book");
            }
            if (UPVOTE.equals(voteDto.getVoteType())) {
                book.setVoteCount(book.getVoteCount() + 1);
            } else {
                book.setVoteCount(book.getVoteCount() - 1);
            }
            voteRepository.save(mapToVote(voteDto, book));
            bookRepository.save(book);
        }

        private Vote mapToVote(VoteDto voteDto, Book book) {
            return Vote.builder()
                    .voteType(voteDto.getVoteType())
                    .book(book)
                    .user(authService.getCurrentUser())
                    .build();
        }
    }

