package com.example.server.service.author;

import com.example.server.data.repository.AuthorFollowersRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.data.repository.UserRepository;
import com.example.server.dto.Author.AuthorDto;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.Author;
import com.example.server.model.User;
import com.example.server.model.id.AuthorFollower;
import com.example.server.model.key.AuthorFollowerKey;
import com.example.server.service.keycloak.KeycloakService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorFollowersRepository authorFollowersRepository;
    private final UserRepository userRepository;
    private final KeycloakService keycloakService;

    public Author getAuthorById(String id) {
        return authorRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Author not found"));
    }

    public AuthorDto getAuthorDtoById(String id) {
        return AuthorDto.fromEntity(authorRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Author not found")));
    }

    public AuthorSimpleDto getAuthorSimpleDtoById(String id) {
        return AuthorSimpleDto.fromEntity(authorRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Author not found")));
    }

    public void createAuthor(Author author) {
        authorRepository.save(author);
    }

    @CacheEvict(cacheNames = {"author.findFollowers", "author.findSimilarBySharedGenres",
            "author.findTopAuthorsByGenre", "author.findTopAuthorsOfMonth",
            "author.findTopAuthorsOfMonth"}, allEntries = true)
    @Override
    public void deleteAuthor(String authorId) {
        authorRepository.deleteById(authorId);
    }

    @Cacheable(value = "author.findFollowers",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<UserSimpleDto> findFollowers(String authorId, Pageable pageable) {
        return new PageDto<>(authorFollowersRepository
                .findAllByAuthor(authorRepository.findById(authorId).orElseThrow(), pageable)
                .map(AuthorFollower::getFollower).map(UserSimpleDto::fromEntity));
    }

    @Cacheable(value = "author.findSimilarBySharedGenres",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AuthorSimpleDto> findSimilarBySharedGenres(String authorId, Pageable pageable) {
        return new PageDto<>(
                authorRepository
                        .findSimilarBySharedGenres(authorId, pageable)
                        .map(AuthorSimpleDto::fromEntity)
        );
    }

    @Cacheable(value = "author.findTopAuthorsByGenre",
            key = "#genreId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AuthorSimpleDto> findTopAuthorsByGenre(Long genreId, Pageable pageable) {
        return new PageDto<>(
                authorRepository
                        .findTopAuthorsByGenre(genreId, pageable)
                        .map(AuthorSimpleDto::fromEntity)
        );
    }

    @Cacheable(value = "author.findTopAuthorsOfMonth",
            key = "'p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AuthorSimpleDto> findTopAuthorsOfMonth(Pageable pageable) {
        return new PageDto<>(
                authorRepository
                        .findTopAuthorsOfMonth(pageable)
                        .map(AuthorSimpleDto::fromEntity)
        );
    }

    public Long countAuthorPlaysByMonth(String authorId) {
        return authorRepository.countAuthorPlaysByMonth(authorId);
    }

    public void subscribeToAuthor(String userId, String authorId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new EntityNotFoundException("Author not found"));

        if (authorFollowersRepository.existsByAuthorAndFollower(author, user)) {
            throw new IllegalStateException("User is already subscribed to this author");
        }

        AuthorFollower authorFollower = new AuthorFollower();
        authorFollower.setId(new AuthorFollowerKey(authorId, userId));
        authorFollower.setAuthor(author);
        authorFollower.setFollower(user);
        authorFollower.setFollowedAt(OffsetDateTime.now());

        authorFollowersRepository.save(authorFollower);
    }

    public void unsubscribeFromAuthor(String userId, String authorId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new EntityNotFoundException("Author not found"));

        AuthorFollower authorFollower = authorFollowersRepository
                .findByAuthorAndFollower(author, user)
                .orElseThrow(() -> new EntityNotFoundException("Subscription not found"));

        authorFollowersRepository.deleteById(authorFollower.getId());
    }

    public boolean isUserSubscribed(String userId, String authorId) {
        AuthorFollowerKey id = new AuthorFollowerKey(authorId, userId);
        return authorFollowersRepository.existsById(id);
    }

    @Override
    public List<AuthorSimpleDto> findByNameLike(String name) {
        return authorRepository.findAllByUserUsernameContainingIgnoreCase(name).stream().map(AuthorSimpleDto::fromEntity).toList();
    }

    @Override
    public List<Author> getAuthorsByIds(Set<String> ids) {
        return authorRepository.findAllById(ids);
    }

    @Override
    public List<Author> getAuthorsByIds(List<String> ids) {
        return authorRepository.findAllById(ids);
    }

    @Override
    public Page<AuthorSimpleDto> findAuthorsByFollowerId(String followerId, Pageable pageable) {
        return authorRepository.findAllByFollowersFollowerIdOrderByFollowersFollowedAtDesc(followerId, pageable).map(AuthorSimpleDto::fromEntity);
    }

    @Override
    @Transactional
    public void becomeAuthor(String userId) {
        Author author = new Author();
        author.setUser(userRepository.findById(userId).orElseThrow());
        author.setCreatedAt(OffsetDateTime.now());
        author.setFollowersCount(0L);
        authorRepository.save(author);
        keycloakService.addRoleToUser(userId,"AUTHOR");
    }
}
