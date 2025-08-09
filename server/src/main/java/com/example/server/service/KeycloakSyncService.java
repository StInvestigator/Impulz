package com.example.server.service;

import com.example.server.model.User;
import com.example.server.model.repository.UserRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class KeycloakSyncService
{
    private final UserRepository userRepository;

    public KeycloakSyncService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User syncUserFromKeycloak(Jwt jwt){
        String keycloakId = jwt.getSubject();
        return userRepository.findById(keycloakId)
                .map(existingUser -> {
                    existingUser.setUsername(jwt.getClaim("preferred_username"));
                    existingUser.setEmail(jwt.getClaim("email"));
                    return userRepository.save(existingUser);
                })
                .orElseGet(() ->{
                   User newUser = new User();
                   newUser.setId(keycloakId);
                   newUser.setUsername(jwt.getClaim("preferred_username"));
                   newUser.setEmail(jwt.getClaim("email"));
                   return userRepository.save(newUser);
                });
    }
}
