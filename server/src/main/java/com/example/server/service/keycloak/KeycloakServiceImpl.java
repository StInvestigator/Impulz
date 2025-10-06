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
