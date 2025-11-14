package com.example.server.service.keycloak.sync;

import com.example.server.model.User;
import com.example.server.data.repository.UserRepository;
import com.example.server.service.image.ImageService;
import com.example.server.service.keycloak.KeycloakServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class KeycloakSyncServiceImpl implements KeycloakSyncService {

    private final UserRepository userRepository;
    private final ImageService imageService;

    @Lazy
    private final KeycloakServiceImpl keycloakServiceImpl;

    public User syncUserFromKeycloak(Jwt jwt) {
        Objects.requireNonNull(jwt, "JWT cannot be null");
        String keycloakId = jwt.getSubject();
        String keycloakUsername = jwt.getClaim("preferred_username");
        String keycloakEmail = jwt.getClaim("email");

        return userRepository.findById(keycloakId)
                .map(existingUser -> updateFromKeycloak(existingUser, keycloakUsername, keycloakEmail))
                .orElseGet(() -> keycloakServiceImpl.createNewUser(keycloakId, keycloakUsername, keycloakEmail));
    }

    public User updateEmail(String userId, String newEmail) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        if (!Objects.equals(newEmail, user.getEmail())) {
            keycloakServiceImpl.updateUserEmail(userId, newEmail);
            user.setEmail(newEmail);
            return userRepository.save(user);
        }

        return user;
    }

    public void updatePassword(String userId, String newPassword) {
        if (newPassword == null || newPassword.length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long");
        }
        keycloakServiceImpl.updateUserPassword(userId, newPassword);
    }

    public void updateUsername(String userId, String newUsername) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        user.setUsername(newUsername);
        userRepository.save(user);
    }

    public User updateAvatar(String userId, String avatarUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        user.setAvatarUrl(avatarUrl);
        return userRepository.save(user);
    }

    private User updateFromKeycloak(User existingUser, String keycloakUsername, String keycloakEmail) {
        if (!Objects.equals(existingUser.getEmail(), keycloakEmail)) {
            existingUser.setEmail(keycloakEmail);
        }
        return userRepository.save(existingUser);
    }
}
