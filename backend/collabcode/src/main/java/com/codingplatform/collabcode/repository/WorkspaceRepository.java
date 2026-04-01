package com.codingplatform.collabcode.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codingplatform.collabcode.model.Workspace;
import java.util.List;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
    public List<Workspace> findByMembers_id(Long id);
}
