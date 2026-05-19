package com.aakanksha.tasktracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardResponse {

    private long totalTasks;

    private long todoTasks;

    private long inProgressTasks;

    private long doneTasks;

    private long overdueTasks;
}