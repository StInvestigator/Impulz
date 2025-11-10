package com.example.server.controller.model;

import com.example.server.dto.User.UserDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable String id,
            @RequestParam String username,
            @RequestParam(required = false) MultipartFile image) {

        UserDto updatedUser = userService.updateUser(id, username, image);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/updateCredentials/{id}")
    public ResponseEntity<UserDto> updateCredentials(
            @PathVariable String id,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String currentPassword,
            @RequestParam(required = false) String newPassword) {

        if (email == null && (currentPassword == null || newPassword == null)) {
            return ResponseEntity.badRequest().build();
        }

        if (email != null) userService.updateEmail(id, email);
        if (newPassword != null && currentPassword != null) userService.updatePassword(id, currentPassword, newPassword);

        return ResponseEntity.ok(userService.getUserDtoById(id));
    }
}