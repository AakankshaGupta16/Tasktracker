package com.aakanksha.tasktracker.dto;

import lombok.Data;

@Data
public class ProjectRequest {

    private String name;

    private String description;

    private Long adminId;
}