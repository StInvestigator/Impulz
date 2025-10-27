package com.example.server.service.author;

import com.example.server.dto.Author.AuthorDto;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface AuthorService
{
    Author getAuthorById(String id);
    AuthorDto getAuthorDtoById(String id);
    AuthorSimpleDto getAuthorSimpleDtoById(String id);
    void createAuthor(Author author);
    void deleteAuthor(String authorId);
    PageDto<UserSimpleDto> findFollowers(String authorId, Pageable pageable);
    PageDto<AuthorSimpleDto> findTopAuthorsOfMonth(Pageable pageable);
    PageDto<AuthorSimpleDto> findSimilarBySharedGenres(String authorId, Pageable pageable);
    PageDto<AuthorSimpleDto> findTopAuthorsByGenre(Long genreId, Pageable pageable);
    Long countAuthorPlaysByMonth(String authorId);
    void subscribeToAuthor(String userId, String authorId);
    void unsubscribeFromAuthor(String userId, String authorId);
    boolean isUserSubscribed(String userId, String authorId);
    List<AuthorSimpleDto> findByNameLike(String name);
    List<Author> getAuthorsByIds(Set<String> ids);
    List<Author> getAuthorsByIds(List<String> ids);
    Page<AuthorSimpleDto> findAuthorsByFollowerId(String followerId, Pageable pageable);
    void becomeAuthor(String userId);
}
