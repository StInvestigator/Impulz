package com.example.server.service.author;

import com.example.server.data.repository.AuthorFollowersRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.model.Author;
import com.example.server.model.User;
import com.example.server.model.id.AuthorFollower;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorFollowersRepository authorFollowersRepository;

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

}
