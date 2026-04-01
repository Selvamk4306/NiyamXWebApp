package com.codingplatform.collabcode.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codingplatform.collabcode.model.Project;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    // 🔥 USER BASED
    List<Project> findByOwnerId(Long ownerId);
}