package com.mentormate.hackathon.persistence.repository;

import com.mentormate.hackathon.persistence.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The project repository
 *
 * @author Polina Usheva
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
