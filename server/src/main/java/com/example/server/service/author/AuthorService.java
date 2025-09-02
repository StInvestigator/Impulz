package com.example.server.service.author;

import com.example.server.model.Author;
import com.example.server.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AuthorService
{
    Author getAuthorById(String id);
    List<Author> findTop20AuthorsOfMonth();
    void createAuthor(Author author);
    void deleteAuthor(String authorId);
    Page<User> findFollowers(String authorId, Pageable pageable);
}
