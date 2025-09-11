package com.example.server.service.author;

import com.example.server.model.Author;
import com.example.server.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuthorService
{
    Author getAuthorById(String id);
    Page<Author> findTopAuthorsOfMonth(Pageable pageable);
    void createAuthor(Author author);
    void deleteAuthor(String authorId);
    Page<User> findFollowers(String authorId, Pageable pageable);
    Page<Author> findSimilarBySharedGenres(String authorId, Pageable pageable);
    Page<Author> findTopAuthorsByGenre(Long genreId, Pageable pageable);
    Long countAuthorPlaysByMonth(String authorId);
    void subscribeToAuthor(String userId, String authorId);
    void unsubscribeFromAuthor(String userId, String authorId);
    boolean isUserSubscribed(String userId, String authorId);
}
