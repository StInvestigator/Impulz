package com.example.server.controller;

import com.example.server.service.keycloak.KeycloakService;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@RestController
@RequestMapping("/admin/user-roles")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class RoleController {
    private final KeycloakService keycloakService;

    @GetMapping("/roles")
    public List<RoleRepresentation> getAllRoles() {
        return keycloakService.getAllRoles();
    }

    @PostMapping("/user/{userId}/role/{roleName}")
    public ResponseEntity<String> addRoleToUser(
            @PathVariable String userId,
            @PathVariable String roleName
    ) {
        try {
            keycloakService.addRoleToUser(userId, roleName);
            return ResponseEntity.ok("Role '" + roleName + "' successfully added to user");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }

    }

    @DeleteMapping("/user/{userId}/role/{roleName}")
    public ResponseEntity<String> removeRoleFromUser(
            @PathVariable String userId,
            @PathVariable String roleName
    ) {
        try {
            keycloakService.removeRoleFromUser(userId, roleName);
            return ResponseEntity.ok("Role '" + roleName + "' successfully removed from user");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }

    }

    @GetMapping("/user/find")
    public ResponseEntity<String> getUserIdByEmail(@RequestParam String email) {
        try {
            return ResponseEntity.ok(keycloakService.getUserIdByEmail(email));
        }
        catch (NotFoundException e){
            return ResponseEntity.status(404).body("User with email '" + email + "' not found");
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/becomeAuthor/{userId}")
    public ResponseEntity<String> becomeAuthor(@PathVariable String userId) {
        try{
            keycloakService.addRoleToUser(userId,"AUTHOR");
            return ResponseEntity.ok("User with id '" + userId + "' successfully became author");
        }
        catch (NotFoundException e){
            return ResponseEntity.status(404).body("User with id '" + userId + "' not found");
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
