package com.codingplatform.collabcode.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codingplatform.collabcode.model.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

     List<Task> findByProjectOwnerId(Long ownerId);
}