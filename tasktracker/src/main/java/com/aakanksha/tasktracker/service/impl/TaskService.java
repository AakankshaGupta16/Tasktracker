package com.aakanksha.tasktracker.service.impl;

import com.aakanksha.tasktracker.dto.CreateTaskRequest;
import com.aakanksha.tasktracker.dto.DashboardResponse;
import com.aakanksha.tasktracker.entity.Project;
import com.aakanksha.tasktracker.entity.Task;
import com.aakanksha.tasktracker.entity.User;
import com.aakanksha.tasktracker.enums.Priority;
import com.aakanksha.tasktracker.enums.TaskStatus;
import com.aakanksha.tasktracker.repository.ProjectRepository;
import com.aakanksha.tasktracker.repository.TaskRepository;
import com.aakanksha.tasktracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public Task createTask(CreateTaskRequest request) {

        User assignedUser = userRepository.findById(request.getAssignedUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(LocalDate.parse(request.getDueDate()));
        task.setPriority(Priority.valueOf(request.getPriority()));
        task.setStatus(TaskStatus.TODO);

        task.setAssignedUser(assignedUser);
        task.setProject(project);

        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Long taskId, String status) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(TaskStatus.valueOf(status));

        return taskRepository.save(task);
    }

    public DashboardResponse getDashboardData() {

        long totalTasks = taskRepository.count();

        long todoTasks = taskRepository.countByStatus(TaskStatus.TODO);

        long inProgressTasks =
                taskRepository.countByStatus(TaskStatus.IN_PROGRESS);

        long doneTasks =
                taskRepository.countByStatus(TaskStatus.DONE);

        long overdueTasks =
                taskRepository.countByDueDateBefore(LocalDate.now());

        return new DashboardResponse(
                totalTasks,
                todoTasks,
                inProgressTasks,
                doneTasks,
                overdueTasks
        );
    }

    public List<Task> getTasksByProject(Long projectId) {

        return taskRepository.findByProjectId(projectId);
    }

    public List<Task> getTasksByUser(Long userId) {

        return taskRepository.findByAssignedUserId(userId);
    }

    // NEW METHOD
    public List<Task> getAllTasks() {

        return taskRepository.findAll();
    }
    public void deleteTask(Long taskId) {

        taskRepository.deleteById(taskId);
    }

}