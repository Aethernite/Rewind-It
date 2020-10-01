package com.mentormate.hackathon.persistence.repository;

import com.mentormate.hackathon.persistence.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The task repository
 *
 * @author Polina Usheva
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
