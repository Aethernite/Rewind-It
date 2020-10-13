package com.mentormate.hackathon.persistence.repository;

import com.mentormate.hackathon.persistence.entity.Timesheet;
import com.mentormate.hackathon.persistence.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Optional;

/**
 * {@link TimesheetRepository} extends {@link JpaRepository} that it helps us easy to operate with {@link Timesheet} data in database
 * <p>
 * Created by Vladislav Penchev on 2020/10/02
 */
@Repository
public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {

    /**
     * @param id     id of {@link Timesheet}
     * @param userId id of {@link User}
     * @return {@link Timesheet} that is saved in our database
     */
    Optional<Timesheet> findByIdAndUser_Id(Long id, Long userId);

    /**
     * @param pageable
     * @param userId   id of {@link User}
     * @return {@link Page} with content all {@link Timesheet}s
     */
    Page<Timesheet> findAllByUser_Id(Pageable pageable, Long userId);
    
    Optional<Timesheet> findTimesheetByFromDate(LocalDate fromDate);
}
