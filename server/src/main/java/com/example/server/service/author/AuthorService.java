package com.example.server.service.author;

import com.example.server.model.Author;

import java.util.List;

public interface AuthorService
{
    Author getAuthorById(String id);
    List<Author> findTop20AuthorsOfMonth();
    void createAuthor(Author author);
    void deleteAuthor(Author author);
}
