package com.example.server.service.author;

import com.example.server.data.repository.AuthorRepository;
import com.example.server.model.Author;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService
{
    private final AuthorRepository authorRepository;

    public Author getAuthorById(String id) {
        return authorRepository.getAuthorById(id);
    }

    public void createAuthor(Author author) {
        authorRepository.save(author);
    }

    public void deleteAuthor(Author author){
        authorRepository.delete(author);
    }

    public List<Author> findTop20AuthorsOfMonth() {
        return authorRepository.findTop20AuthorsOfMonth();
    }

}
