package com.example.server.controller.model;

import com.example.server.data.repository.AuthorRepository;
import com.example.server.dto.Author.AuthorDto;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.model.Author;
import com.example.server.service.author.AuthorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/author")
@RequiredArgsConstructor
public class AuthorController
{
    private final AuthorService authorService;

    @GetMapping("/simpleDto/{id}")
    public AuthorSimpleDto getAuthorSimpleDto(@PathVariable String id){
        Author author = authorService.getAuthorById(id);
        return AuthorSimpleDto.fromEntity(author);
    }

    @GetMapping("/Dto/{id}")
    public AuthorDto getAuthorDto(@PathVariable String id){
        Author author = authorService.getAuthorById(id);
        return AuthorDto.fromEntity(author);
    }
}