package com.taskmanager.repository;

import com.taskmanager.entity.Task;
import com.taskmanager.entity.Status;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // 🔹 Get tasks assigned to a specific user
    List<Task> findByAssignedToId(Long userId);

    // 🔹 Get tasks for a specific project
    List<Task> findByProjectId(Long projectId);

    // 🔹 Get overdue tasks (due date passed and not completed)
    List<Task> findByDueDateBeforeAndStatusNot(LocalDate date, Status status);
}