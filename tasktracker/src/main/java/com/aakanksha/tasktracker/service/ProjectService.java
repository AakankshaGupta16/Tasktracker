package com.aakanksha.tasktracker.service;

import com.aakanksha.tasktracker.dto.ProjectRequest;
import com.aakanksha.tasktracker.entity.Project;

import java.util.List;

public interface ProjectService {

    Project createProject(ProjectRequest request);

    Project addMember(Long projectId, Long userId);
    List<Project> getAllProjects();
}