package com.mentormate.hackathon.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

/**
 * The Project entity class.
 *
 * @author Polina Usheva
 */
@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "projects")
public class Project extends BaseEntity {

    @NotNull(message = "Project name must be valid.")
    private String name;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Task> tasks = new HashSet<>();
}
