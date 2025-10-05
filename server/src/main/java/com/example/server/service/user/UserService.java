package com.example.server.service.user;

import com.example.server.dto.User.UserDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.User;

public interface UserService {
    User save(User user);
    User getUserById(String id);
    UserDto getUserDtoById(String id);
    UserSimpleDto getUserSimpleDtoById(String id);
}
