package com.mentormate.hackathon.persistence.repository;

import com.mentormate.hackathon.persistence.entity.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Vladislav Penchev on 2020/10/02
 */
@Repository
public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {
}
