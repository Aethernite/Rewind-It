package com.mentormate.hackathon.persistence.repository;

import com.mentormate.hackathon.persistence.entity.Task;
import com.mentormate.hackathon.persistence.entity.TypeOfTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * The task repository
 *
 * @author Polina Usheva
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Optional<Task> findByName(TypeOfTask name);

}
