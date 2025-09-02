package com.example.server.service.author;

import com.example.server.data.repository.AuthorFollowersRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.model.Author;
import com.example.server.model.User;
import com.example.server.model.id.AuthorFollower;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorFollowersRepository authorFollowersRepository;

    public Author getAuthorById(String id) {
        return authorRepository.getAuthorById(id);
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
        return authorFollowersRepository.findAllByAuthor(authorRepository.getAuthorById(authorId), pageable).map(AuthorFollower::getFollower);
    }

    public List<Author> findTop20AuthorsOfMonth() {
        return authorRepository.findTop20AuthorsOfMonth();
    }

}
