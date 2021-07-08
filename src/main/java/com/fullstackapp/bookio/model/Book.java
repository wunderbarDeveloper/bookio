package com.fullstackapp.bookio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import static javax.persistence.GenerationType.IDENTITY;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long bookId;
    private String title;
    private String author;
    private String publisher;
    private String published;
    @Lob
    private String description;
    private double price;
    private Integer pages;
    private String imageUrl;
    private Integer voteCount = 0;
}
