package com.example.server.controller;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/admin/user-roles")
@PreAuthorize("hasRole('ADMIN')")
public class RoleController
{
    @Value("${keycloak.realm}")
    private String realm;

    private final Keycloak keycloak;

    @Autowired
    public RoleController(Keycloak keycloak){
        this.keycloak = keycloak;
    }

    @GetMapping("/roles")
    public List<RoleRepresentation> getAllRoles(){
        return keycloak.realm(realm).roles().list();
    }

    @GetMapping("/healthcheck")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("Working!");
    }

    @PostMapping("/user/{userId}/role/{roleName}")
    public ResponseEntity<String> addRoleToUser(
            @PathVariable String userId,
            @PathVariable String roleName
    ){
        RealmResource realmResource = keycloak.realm(realm);
        RoleRepresentation role = realmResource.roles().get(roleName).toRepresentation();

        UserResource userResource = realmResource.users().get(userId);
        userResource.roles().realmLevel().add(Collections.singletonList(role));

        return ResponseEntity.ok("Role '" + roleName + "' successfully added to user");
    }

    @DeleteMapping("/user/{userId}/role/{roleName}")
    public ResponseEntity<String> removeRoleFromUser(
            @PathVariable String userId,
            @PathVariable String roleName
    ){
        RealmResource realmResource = keycloak.realm(realm);
        RoleRepresentation role = realmResource.roles().get(roleName).toRepresentation();

        UserResource userResource = realmResource.users().get(userId);
        userResource.roles().realmLevel().remove(Collections.singletonList(role));

        return ResponseEntity.ok("Role '" + roleName + "' successfully removed from user");
    }

    @GetMapping("/user/find")
    public ResponseEntity<String> getUserIdByEmail(@RequestParam String email) {
        List<UserRepresentation> users = keycloak.realm(realm).users().searchByEmail(email, true);
        if (users.isEmpty()) {
            return ResponseEntity.status(404).body("Пользователь с email '" + email + "' не найден");
        }
        return ResponseEntity.ok(users.get(0).getId());
    }
}
