package com.aakanksha.tasktracker.controller;

import com.aakanksha.tasktracker.dto.AddMemberRequest;
import com.aakanksha.tasktracker.dto.ProjectRequest;
import com.aakanksha.tasktracker.entity.Project;
import com.aakanksha.tasktracker.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public Project createProject(@RequestBody ProjectRequest request) {

        return projectService.createProject(request);
    }
    @PutMapping("/{projectId}/members")
    public Project addMember(
            @PathVariable Long projectId,
            @RequestBody AddMemberRequest request
    ) {
        return projectService.addMember(projectId, request.getUserId());
    }
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }
}