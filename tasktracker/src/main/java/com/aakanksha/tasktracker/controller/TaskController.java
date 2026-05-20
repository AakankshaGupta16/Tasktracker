package com.aakanksha.tasktracker.controller;

import com.aakanksha.tasktracker.dto.CreateTaskRequest;
import com.aakanksha.tasktracker.dto.DashboardResponse;
import com.aakanksha.tasktracker.dto.UpdateTaskStatusRequest;
import com.aakanksha.tasktracker.entity.Task;
import com.aakanksha.tasktracker.service.impl.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody CreateTaskRequest request) {

        return taskService.createTask(request);
    }

    @PutMapping("/{taskId}/status")
    public Task updateTaskStatus(
            @PathVariable Long taskId,
            @RequestBody UpdateTaskStatusRequest request
    ) {

        return taskService.updateTaskStatus(taskId, request.getStatus());
    }

    @GetMapping("/dashboard")
    public DashboardResponse getDashboard() {

        return taskService.getDashboardData();
    }

    @GetMapping("/project/{projectId}")
    public List<Task> getTasksByProject(
            @PathVariable Long projectId
    ) {

        return taskService.getTasksByProject(projectId);
    }

    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUser(
            @PathVariable Long userId
    ) {

        return taskService.getTasksByUser(userId);
    }

    // NEW METHOD
    @GetMapping
    public List<Task> getAllTasks() {

        return taskService.getAllTasks();
    }
    @DeleteMapping("/{taskId}")
    public String deleteTask(
            @PathVariable Long taskId
    ) {

        taskService.deleteTask(taskId);

        return "Task deleted successfully";
    }
}