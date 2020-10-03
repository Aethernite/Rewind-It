package com.mentormate.hackathon.persistence.repository;

import com.mentormate.hackathon.persistence.entity.Timesheet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by Vladislav Penchev on 2020/10/02
 */
@Repository
public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {
    
    Optional<Timesheet> findByIdAndUser_Id(Long id, Long userId);
    
    Page<Timesheet> findAllByUser_Id(Pageable pageable, Long userId);
}
