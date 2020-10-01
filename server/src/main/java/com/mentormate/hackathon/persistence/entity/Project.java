package com.mentormate.hackathon.persistence.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
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
    
    @Column(unique = true)
    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Task> tasks = new HashSet<>();
}
