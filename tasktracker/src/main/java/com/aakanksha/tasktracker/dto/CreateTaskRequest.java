package com.aakanksha.tasktracker.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTaskRequest {

    private String title;

    private String description;

    private String dueDate;

    private String priority;

    private Long assignedUserId;

    private Long projectId;
}