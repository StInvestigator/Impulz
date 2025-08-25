package com.example.server.data.repository;

import com.example.server.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author,String>
{
    Author getAuthorById(String id);
}
