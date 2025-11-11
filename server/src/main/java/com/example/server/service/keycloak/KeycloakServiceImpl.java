package com.example.server.service.keycloak;

import com.example.server.model.User;
import com.example.server.data.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class KeycloakServiceImpl implements KeycloakService {

    private final Keycloak keycloak;
    private final UserRepository userRepository;

    @Value("${keycloak.realm}")
    private String realm;

    @Override
    public void updateUserEmail(String userId, String newEmail) {
        RealmResource realmResource = keycloak.realm(realm);
        UserResource userResource = realmResource.users().get(userId);
        UserRepresentation userRep = userResource.toRepresentation();
        userRep.setEmail(newEmail);
        userRep.setEmailVerified(false);
        userResource.update(userRep);
    }

    @Override
    public void updateUserPassword(String userId, String currentPassword, String newPassword) {
        RealmResource realmResource = keycloak.realm(realm);
        UserResource userResource = realmResource.users().get(userId);

        CredentialRepresentation newCred = new CredentialRepresentation();
        newCred.setType(CredentialRepresentation.PASSWORD);
        newCred.setValue(newPassword);
        newCred.setTemporary(false);

        userResource.resetPassword(newCred);
    }

    @Override
    public void updateUserUsername(String userId, String newUsername) {
        RealmResource realmResource = keycloak.realm(realm);
        UserResource userResource = realmResource.users().get(userId);

        UserRepresentation userRep = userResource.toRepresentation();
        userRep.setUsername(newUsername);
        userResource.update(userRep);
    }

    @Override
    public String getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken token) {
            return token.getName();
        } else {
            return null;
        }
    }

    @Transactional
    @Override
    public User createNewUser(String id, String username, String email) {
        User newUser = new User();
        newUser.setId(id);
        newUser.setUsername(username);
        newUser.setEmail(email);
        return userRepository.save(newUser);
    }

    @Override
    public List<RoleRepresentation> getAllRoles() {
        return keycloak.realm(realm).roles().list();
    }

    @Override
    public void addRoleToUser(String userId, String roleName) {
        RealmResource realmResource = keycloak.realm(realm);
        RoleRepresentation roleRep = realmResource.roles().get(roleName).toRepresentation();
        UserResource userResource = realmResource.users().get(userId);
        userResource.roles().realmLevel().add(Collections.singletonList(roleRep));
    }

    @Override
    public void removeRoleFromUser(String userId, String roleName) {
        RealmResource realmResource = keycloak.realm(realm);
        RoleRepresentation roleRep = realmResource.roles().get(roleName).toRepresentation();
        UserResource userResource = realmResource.users().get(userId);
        userResource.roles().realmLevel().remove(Collections.singletonList(roleRep));
    }

    @Override
    public String getUserIdByEmail(String email) {
        List<UserRepresentation> users = keycloak.realm(realm).users().searchByEmail(email, true);
        if (users.isEmpty()) throw new NotFoundException("User not found");
        return users.get(0).getId();
    }
}
