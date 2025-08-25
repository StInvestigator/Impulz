package com.example.server.controller.model;

import com.example.server.data.repository.AuthorRepository;
import com.example.server.dto.Author.AuthorDto;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.model.Author;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/author")
@RequiredArgsConstructor
public class AuthorController
{
    private final AuthorRepository authorRepository;

    @GetMapping("/simpleDto/{id}")
    public AuthorSimpleDto getAuthorSimpleDto(@PathVariable String id){
        Author author = authorRepository.getAuthorById(id);
        return AuthorSimpleDto.fromEntity(author);
    }

    @GetMapping("/Dto/{id}")
    public AuthorDto getAuthorDto(@PathVariable String id){
        Author author = authorRepository.getAuthorById(id);
        return AuthorDto.fromEntity(author);
    }
}
