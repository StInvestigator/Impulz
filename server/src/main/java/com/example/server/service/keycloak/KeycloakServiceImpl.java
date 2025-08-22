package com.example.server.service.keycloak;


import com.example.server.model.User;
import com.example.server.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@RequiredArgsConstructor
@Service
public class KeycloakServiceImpl implements KeycloakService {
    private final UserRepository userRepository;

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
            return userRepository.save(user);
        }

        log.debug("No updates needed for user: {}", user.getId());
        return user;
    }

    public User createNewUser(String id, String username, String email) {
        User newUser = new User();
        newUser.setId(id);
        newUser.setUsername(username);
        newUser.setEmail(email);

        log.info("Creating new user: {}", id);
        return userRepository.save(newUser);
    }
}
