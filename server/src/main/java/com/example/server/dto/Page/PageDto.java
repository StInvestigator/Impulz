package com.example.server.dto.Page;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.io.Serializable;
import java.util.List;

@Data
public class PageDto<T> implements Serializable {
    private List<T> content;
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;

    public PageDto() {
    }

    public PageDto(List<T> content, int page, int size, int totalPages, long totalElements) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }

    public PageDto(Page<T> page) {
        this.content = page.getContent();
        this.page = page.getNumber();
        this.size = page.getSize();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
    }
}
