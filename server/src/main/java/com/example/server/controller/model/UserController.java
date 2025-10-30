package com.example.server.controller.model;

import com.example.server.dto.User.UserDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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