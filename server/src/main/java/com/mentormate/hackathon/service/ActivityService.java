package com.mentormate.hackathon.service;

import com.mentormate.hackathon.persistence.entity.Activity;
import com.mentormate.hackathon.persistence.entity.DayOfTimesheet;
import com.mentormate.hackathon.persistence.entity.Timesheet;
import com.mentormate.hackathon.persistence.entity.User;
import com.mentormate.hackathon.persistence.repository.ActivityRepository;
import com.mentormate.hackathon.persistence.repository.TimesheetRepository;
import com.mentormate.hackathon.service.dto.response.TimesheetResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Represents the activity service. Contains all of the business logic.
 *
 * @author Polina Usheva
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final DayOfTimesheetService dayOfTimesheetService;
//    private final TimesheetService timesheetService;
//    private final UserService userService;
//    private final TimesheetRepository timesheetRepository;

    /**
     * Creates a new activity if the given task belongs to the given project
     * and seeds the database with the given days of timesheets.
     *
     * @return the saved response dto
     */
    public Activity create(LocalDateTime fromDate) {
        List<DayOfTimesheet> dayOfTimesheet = dayOfTimesheetService.create(fromDate);
        Activity activity = new Activity(null, null, dayOfTimesheet);
        log.info("Created activity with id {}!", activity.getId());
        return this.activityRepository.save(activity);
    }

//    public Activity create(Long timesheetId, String userEmail) {
//        User user = userService.checkIfUserExist(userEmail);
//        Timesheet timesheet = timesheetService.checkIfTimesheetExists(timesheetId, user.getId());
//        List<DayOfTimesheet> dayOfTimesheet = dayOfTimesheetService.create(timesheet.getFromDate().atStartOfDay());
//        Activity activity = new Activity(null, null, dayOfTimesheet);
//        timesheet.getActivities().add(activity);
//        timesheetRepository.save(timesheet);
//        log.info("Created activity with id {}!", activity.getId());
//        return this.activityRepository.save(activity);
//    }
}
