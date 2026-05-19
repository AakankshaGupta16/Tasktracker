package com.aakanksha.tasktracker.repository;

import com.aakanksha.tasktracker.entity.Task;
import com.aakanksha.tasktracker.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    long countByStatus(TaskStatus status);

    long countByAssignedUserId(Long userId);

    long countByDueDateBefore(LocalDate date);
    List<Task> findByProjectId(Long projectId);
    List<Task> findByAssignedUserId(Long userId);
}