package com.example.server.data.repository;

import com.example.server.model.Author;
import com.example.server.model.id.AuthorFollower;
import com.example.server.model.key.AuthorFollowerKey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AuthorFollowersRepository extends JpaRepository<AuthorFollower, AuthorFollowerKey>
{
    Page<AuthorFollower> findAllByAuthor(Author author, Pageable pageable);
}
