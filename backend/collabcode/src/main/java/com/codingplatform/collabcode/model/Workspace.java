package com.codingplatform.collabcode.model;

import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.CascadeType;

@Entity
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public void setName(String name){
        this.name = name;
    }

    // Owner of workspace
    @ManyToOne
    @SuppressWarnings("unused")
    private User owner;
    public void setOwner(User owner){
        this.owner = owner;
    }
    // Team members
    @ManyToMany
    @JoinTable(
        name = "workspace_members",
        joinColumns = @JoinColumn(name = "workspace_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )

    private List<User> members = new ArrayList<>();

    public void setMembers(List<User> members){
        this.members = members;
    }

    public List<User> getMembers(){
        return members;
    }

    public Long getId() {
        return id;
    }
}