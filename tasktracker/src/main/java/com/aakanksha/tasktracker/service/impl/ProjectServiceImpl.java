package com.aakanksha.tasktracker.service.impl;

import com.aakanksha.tasktracker.dto.ProjectRequest;
import com.aakanksha.tasktracker.entity.Project;
import com.aakanksha.tasktracker.entity.User;
import com.aakanksha.tasktracker.repository.ProjectRepository;
import com.aakanksha.tasktracker.repository.UserRepository;
import com.aakanksha.tasktracker.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Override
    public Project createProject(ProjectRequest request) {

        User admin = userRepository.findById(request.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .admin(admin)
                .build();

        return projectRepository.save(project);
    }
    @Override
    public Project addMember(Long projectId, Long userId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        project.getMembers().add(user);

        return projectRepository.save(project);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

}