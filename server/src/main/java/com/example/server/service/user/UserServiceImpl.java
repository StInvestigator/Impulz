package com.example.server.service.user;

import com.example.server.data.repository.UserRepository;
import com.example.server.dto.User.UserDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.User;
import com.example.server.service.image.ImageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ImageService imageService;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public UserDto getUserDtoById(String id) {
        return UserDto.fromEntity(userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found")));
    }

    @Override
    public UserSimpleDto getUserSimpleDtoById(String id) {
        return UserSimpleDto.fromEntity(userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found")));
    }

    @Override
    public UserDto updateUser(String userId, String username, MultipartFile imageFile) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(username);

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                if (user.getAvatarUrl() != null && !user.getAvatarUrl().isEmpty()) {
                    try {
                        imageService.deleteImage(user.getAvatarUrl());
                    } catch (Exception e) {
                        log.warn("Failed to delete old image: {}", user.getAvatarUrl(), e);
                    }
                }

                String imageTitle = "user_" + userId + "_avatar";
                String newImageUrl = imageService.uploadImage(imageFile, imageTitle);
                user.setAvatarUrl(newImageUrl);

            } catch (Exception e) {
                throw new RuntimeException("Failed to upload new image: " + e.getMessage(), e);
            }
        }

        User savedUser = userRepository.save(user);
        return UserDto.fromEntity(savedUser);
    }
}