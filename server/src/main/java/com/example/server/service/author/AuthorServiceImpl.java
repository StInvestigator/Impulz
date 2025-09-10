package com.example.server.service.author;

import com.example.server.data.repository.AuthorFollowersRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.data.repository.UserRepository;
import com.example.server.model.Author;
import com.example.server.model.User;
import com.example.server.model.id.AuthorFollower;
import com.example.server.model.key.AuthorFollowerKey;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorFollowersRepository authorFollowersRepository;
    private final UserRepository userRepository;

    public Author getAuthorById(String id) {
        return authorRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Author not found"));
    }

    public void createAuthor(Author author) {
        authorRepository.save(author);
    }

    @Override
    public void deleteAuthor(String authorId) {
        authorRepository.deleteById(authorId);
    }

    @Override
    public Page<User> findFollowers(String authorId, Pageable pageable) {
        return authorFollowersRepository.findAllByAuthor(authorRepository.findById(authorId).orElseThrow(), pageable).map(AuthorFollower::getFollower);
    }

    @Override
    public Page<Author> findSimilarBySharedGenres(String authorId, Pageable pageable) {
        return authorRepository.findSimilarBySharedGenres(authorId, pageable);
    }

    @Override
    public Page<Author> findTopAuthorsByGenre(Long genreId, Pageable pageable) {
        return authorRepository.findTopAuthorsByGenre(genreId, pageable);
    }

    public Page<Author> findTopAuthorsOfMonth(Pageable pageable) {
        return authorRepository.findTopAuthorsOfMonth(pageable);
    }

    public Long countAuthorPlaysByMonth(String authorId){
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
}
