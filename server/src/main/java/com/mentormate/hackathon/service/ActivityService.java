package com.mentormate.hackathon.service;

import com.mentormate.hackathon.controller.handler.exception.IncorrectDataInput;
import com.mentormate.hackathon.persistence.entity.Activity;
import com.mentormate.hackathon.persistence.entity.DayOfTimesheet;
import com.mentormate.hackathon.persistence.entity.Project;
import com.mentormate.hackathon.persistence.entity.Task;
import com.mentormate.hackathon.persistence.repository.ActivityRepository;
import com.mentormate.hackathon.service.dto.ActivityRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    private final TaskService taskService;

    private final ProjectService projectService;

    private final DayOfTimesheetService dayOfTimesheetService;

    /**
     * Creates a new activity if the given task belongs to the given project
     * and seeds the database with the given days of timesheets.
     *
     * @param activityRequestDTO the request dto
     * @return the saved response dto
     */
    public Activity create(ActivityRequestDTO activityRequestDTO, LocalDateTime fromDate) {
        Task task = taskService.find(activityRequestDTO.getTask().getId());
        Project project = projectService.find(activityRequestDTO.getProject().getId());
        validateProjectAndTaskNames(task, project, activityRequestDTO);
        taskBelongsToProject(task, project);

        List<DayOfTimesheet> dayOfTimesheets = new ArrayList<>();
        activityRequestDTO.getTimesheetDays().forEach(timesheetDay -> {
            List<DayOfTimesheet> dayOfTimesheet = dayOfTimesheetService.create(timesheetDay, fromDate);
            dayOfTimesheets.addAll(dayOfTimesheet);
        });

        Activity activity = new Activity(project, task, dayOfTimesheets);
        log.info("Created activity with id {}!", activity.getId());
        return this.activityRepository.save(activity);
    }

    /**
     * Checks whether the project and task names match with the given id.
     *
     * @param task       the given task
     * @param project    the given project
     * @param requestDTO the request activity dto
     */
    private void validateProjectAndTaskNames(Task task, Project project,
                                             ActivityRequestDTO requestDTO) {

        Task givenProjectByTask = taskService.findByName(requestDTO.getTask().getName());
        Project givenProjectByName = projectService.findByName(requestDTO.getProject().getName());

        if (!(project.getName().equals(givenProjectByName.getName())
                && task.getName().equals(givenProjectByTask.getName()))) {
            throw new IncorrectDataInput("Incorrect input. The names must match with the id's.");
        }
    }

    /**
     * Checks whether a task belongs to a project.
     *
     * @param task    the task
     * @param project the project
     * @return true if the task belongs to the project
     */
    private boolean taskBelongsToProject(Task task, Project project) {
        for (Task currentTask : project.getTasks()) {
            if (currentTask.equals(task)) {
                return true;
            }
        }
        throw new IncorrectDataInput("The given task does not belong to the project");
    }
}
