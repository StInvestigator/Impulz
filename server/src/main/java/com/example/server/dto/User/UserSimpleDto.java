package com.example.server.dto.User;

import com.example.server.model.User;
import lombok.Data;


@Data
public class UserSimpleDto
{
    private String id;
    private String name;
    private String avatarUrl;

    public static UserSimpleDto fromEntity(User user){
        UserSimpleDto dto = new UserSimpleDto();
        dto.setId(user.getId());
        dto.setName(user.getUsername());
        dto.setAvatarUrl(user.getAvatarUrl());
        return dto;
    }
}
