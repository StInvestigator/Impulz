package com.example.server.controller.model;

import com.example.server.dto.Author.AuthorDto;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.User.UserDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.service.author.AuthorService;
import com.example.server.service.user.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/Dto/{id}")
    public UserDto getUserDto(@PathVariable String id) {
        return userService.getUserDtoById(id);
    }

    @GetMapping("/simpleDto/{id}")
    public UserSimpleDto getUserSimpleDto(@PathVariable String id) {
        return userService.getUserSimpleDtoById(id);
    }
}