package com.example.server.service.user;

import com.example.server.data.repository.UserRepository;
import com.example.server.dto.User.UserDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.Author;
import com.example.server.model.User;
import com.example.server.service.author.AuthorService;
import com.example.server.service.elasticsearch.document.DataSyncService;
import com.example.server.service.image.ImageService;
import com.example.server.service.keycloak.KeycloakService;
import com.example.server.service.keycloak.KeycloakServiceImpl;
import com.example.server.service.keycloak.sync.KeycloakSyncServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ImageService imageService;
    private final KeycloakSyncServiceImpl keycloakSyncService;
    private final DataSyncService dataSyncService;
    private final AuthorService authorService;

    @Lazy
    private final KeycloakServiceImpl keycloakService;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public UserDto getUserDtoById(String id) {
        return UserDto.fromEntity(getUserById(id));
    }

    @Override
    @Transactional
    public UserDto updateUser(String userId, String username, MultipartFile imageFile) {
        User user = getUserById(userId);

        if (username != null && !username.equals(user.getUsername())) {
            keycloakService.updateUserUsername(userId, username);
            user.setUsername(username);
            if(authorService.isAuthorWithIdExists(userId)) {
                dataSyncService.syncAuthor(user);
            }
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                if (user.getAvatarUrl() != null) {
                    imageService.deleteImage(user.getAvatarUrl());
                }
                String imageTitle = "user_" + userId + "_avatar";
                user.setAvatarUrl(imageService.uploadImage(imageFile, imageTitle));
            } catch (Exception e) {
                throw new RuntimeException("Failed to upload new image", e);
            }
        }

        return UserDto.fromEntity(userRepository.save(user));
    }

    public UserDto updateEmail(String userId, String newEmail) {
        User updated = keycloakSyncService.updateEmail(userId, newEmail);
        return UserDto.fromEntity(updated);
    }

    public void updatePassword(String userId, String newPassword) {
        keycloakService.updateUserPassword(userId, newPassword);
    }

    @Override
    public UserSimpleDto getUserSimpleDtoById(String id) {
        return UserSimpleDto.fromEntity(getUserById(id));
    }

    @Override
    public void addRoleToUser(String userId, String role) {
        keycloakService.addRoleToUser(userId, role);
    }

    @Override
    public void removeRoleFromUser(String userId, String role) {
        keycloakService.removeRoleFromUser(userId, role);
    }

}

