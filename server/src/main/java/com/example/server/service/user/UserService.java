package com.example.server.service.user;

import com.example.server.dto.User.UserDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User save(User user);
    User getUserById(String id);
    UserDto getUserDtoById(String id);
    UserSimpleDto getUserSimpleDtoById(String id);
    UserDto updateUser(String userId, String username, MultipartFile imageFile);
}
