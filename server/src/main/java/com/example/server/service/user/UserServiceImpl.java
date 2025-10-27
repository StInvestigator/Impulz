package com.example.server.service.user;

import com.example.server.data.repository.UserRepository;
import com.example.server.dto.User.UserDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

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
}
