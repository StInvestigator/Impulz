package com.example.server.service.keycloak;


import com.example.server.model.Playlist;
import com.example.server.model.User;
import com.example.server.data.repository.UserRepository;
import com.example.server.service.playlist.PlaylistService;
import com.example.server.service.user.UserService;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Service
public class KeycloakServiceImpl implements KeycloakService {
    private final UserService userService;
    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    @Override
    public void updateUserEmail(String userId, String newEmail) {
        try {
            RealmResource realmResource = keycloak.realm(realm);
            UserResource userResource = realmResource.users().get(userId);

            UserRepresentation userRep = userResource.toRepresentation();
            userRep.setEmail(newEmail);
            userRep.setEmailVerified(false);

            userResource.update(userRep);

            log.info("Email updated in Keycloak for user {}: {}", userId, newEmail);

        } catch (Exception e) {
            log.error("Failed to update email in Keycloak for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to update email in Keycloak: " + e.getMessage(), e);
        }
    }

    @Override
    public void updateUserUsername(String userId, String newUsername) {
        try {
            RealmResource realmResource = keycloak.realm(realm);
            UserResource userResource = realmResource.users().get(userId);

            UserRepresentation userRep = userResource.toRepresentation();
            userRep.setUsername(newUsername);

            userResource.update(userRep);

            log.info("Username updated in Keycloak for user {}: {}", userId, newUsername);

        } catch (Exception e) {
            log.error("Failed to update username in Keycloak for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to update username in Keycloak: " + e.getMessage(), e);
        }
    }

    public User updateExistingUser(User user, String username, String email) {
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
            return userService.save(user);
        }

        log.debug("No updates needed for user: {}", user.getId());
        return user;
    }

    @Override
    public void addRoleToUser(String userId, String role) {
        RealmResource realmResource = keycloak.realm(realm);
        RoleRepresentation roleRep = realmResource.roles().get(role).toRepresentation();

        UserResource userResource = realmResource.users().get(userId);
        userResource.roles().realmLevel().add(Collections.singletonList(roleRep));
    }

    @Override
    public void removeRoleFromUser(String userId, String role) {
        RealmResource realmResource = keycloak.realm(realm);
        RoleRepresentation roleRep = realmResource.roles().get(role).toRepresentation();

        UserResource userResource = realmResource.users().get(userId);
        userResource.roles().realmLevel().remove(Collections.singletonList(roleRep));
    }

    @Override
    public List<RoleRepresentation> getAllRoles() {
        return keycloak.realm(realm).roles().list();
    }

    @Override
    public String getUserIdByEmail(String email) {
        List<UserRepresentation> users = keycloak.realm(realm).users().searchByEmail(email, true);
        if (users.isEmpty()) {
            throw new NotFoundException("User not found");
        }
        return users.get(0).getId();
    }

    @Transactional
    public User createNewUser(String id, String username, String email) {
        User newUser = new User();
        newUser.setId(id);
        newUser.setUsername(username);
        newUser.setEmail(email);

        log.info("Creating new user: {}", id);
        return userService.save(newUser);
    }
}
