package com.example.server.service;

import com.example.server.model.User;
import com.example.server.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class KeycloakSyncService {
    private final UserRepository userRepository;

    public User syncUserFromKeycloak(Jwt jwt) {
        Objects.requireNonNull(jwt, "JWT cannot be null");
        String keycloakId = jwt.getSubject();
        String username = jwt.getClaim("preferred_username");
        String email = jwt.getClaim("email");

        log.debug("Syncing user: {}, username: {}, email: {}", keycloakId, username, email);

        return userRepository.findById(keycloakId)
                .map(existingUser -> updateExistingUser(existingUser, username, email))
                .orElseGet(() -> createNewUser(keycloakId, username, email));
    }

    private User updateExistingUser(User user, String username, String email) {
        boolean needsUpdate = false;

        if (username != null && !username.equals(user.getUsername())) {
            user.setUsername(username);
            needsUpdate = true;
        }

        if (email != null && !email.equals(user.getEmail())) {
            user.setEmail(email);
            needsUpdate = true;
        }

        if (needsUpdate) {
            log.info("Updating user: {}", user.getId());
            return userRepository.save(user);
        }

        log.debug("No updates needed for user: {}", user.getId());
        return user;
    }

    private User createNewUser(String id, String username, String email) {
        User newUser = new User();
        newUser.setId(id);
        newUser.setUsername(username);
        newUser.setEmail(email);

        log.info("Creating new user: {}", id);
        return userRepository.save(newUser);
    }
}