package com.fullstackapp.bookio.mapper;

import com.fullstackapp.bookio.dto.CommentsDto;
import com.fullstackapp.bookio.model.Book;
import com.fullstackapp.bookio.model.Comment;
import com.fullstackapp.bookio.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "text", source = "commentsDto.text")
    @Mapping(target = "createdDate", expression = "java(java.time.Instant.now())")
//    @Mapping(target = "book", source = "book")
//    @Mapping(target = "user", source = "user")
    Comment map(CommentsDto commentsDto, Book book, User user);

    @Mapping(target = "bookId", expression = "java(comment.getBook().getBookId())")
    @Mapping(target = "userName", expression = "java(comment.getUser().getUsername())")
    CommentsDto mapToDto(Comment comment);
}
