package com.aakanksha.tasktracker.repository;

import com.aakanksha.tasktracker.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}