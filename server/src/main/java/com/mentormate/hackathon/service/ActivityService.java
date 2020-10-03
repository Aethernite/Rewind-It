package com.mentormate.hackathon.service;

import com.mentormate.hackathon.controller.handler.exception.IncorrectDataInput;
import com.mentormate.hackathon.controller.handler.exception.NotFoundException;
import com.mentormate.hackathon.persistence.entity.Activity;
import com.mentormate.hackathon.persistence.entity.DayOfTimesheet;
import com.mentormate.hackathon.persistence.entity.Project;
import com.mentormate.hackathon.persistence.entity.Task;
import com.mentormate.hackathon.persistence.repository.ActivityRepository;
import com.mentormate.hackathon.service.dto.ActivityRequestDTO;
import com.mentormate.hackathon.service.dto.ActivityResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    private final ModelMapper modelMapper;

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
    public ActivityResponseDTO create(ActivityRequestDTO activityRequestDTO) {

        Task task = taskService.find(activityRequestDTO.getTask().getId());
        Project project = projectService.find(activityRequestDTO.getProject().getId());

        List<DayOfTimesheet> dayOfTimesheets = new ArrayList<>();
        
        activityRequestDTO.getTimesheetDays().forEach(timesheetDay -> {
            DayOfTimesheet dayOfTimesheet = dayOfTimesheetService.create(timesheetDay);
            dayOfTimesheets.add(dayOfTimesheet);
        });

        validateProjectAndTaskNames(task, project, activityRequestDTO);
        taskBelongsToProject(task, project);

        Activity activity = new Activity(project, task, dayOfTimesheets);
        this.activityRepository.save(activity);
        
        log.info("Created activity with id {}!", activity.getId());
        return this.modelMapper.map(activity, ActivityResponseDTO.class);
    }

    /**
     * Deletes an activity by id.
     *
     * @param id the id of the activity that should be deleted
     * @return the deleted response dto
     */
    public ActivityResponseDTO delete(Long id) {

        Activity activity = this.activityRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Wrong id: %s!", id)));

        ActivityResponseDTO activityResponseDTO = this.modelMapper.map(activity, ActivityResponseDTO.class);
        this.activityRepository.deleteById(id);
        log.info("Successfully deleted activity with id: {}", id);

        return activityResponseDTO;
    }

    /**
     * Returns an activity by id
     *
     * @param id the id of the wanted activity
     * @return the activity
     */
    public ActivityResponseDTO getById(Long id) {

        log.info("Returned activity with id:: {}", id);
        return this.activityRepository
                .findById(id)
                .map(activity -> this.modelMapper.map(activity, ActivityResponseDTO.class))
                .orElseThrow(() -> new NotFoundException("Invalid id!"));
    }

    /**
     * Updates an activity by id.
     *
     * @param id                 the activity which should be updated
     * @param activityRequestDTO the updated activity
     * @return the updated activity
     */
    public ActivityResponseDTO updateById(Long id, ActivityRequestDTO activityRequestDTO) {

        Activity activity = this.activityRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Invalid id!"));

        Task task = taskService.find(activityRequestDTO.getTask().getId());
        Project project = projectService.find(activityRequestDTO.getProject().getId());

        List<DayOfTimesheet> dayOfTimesheets = new ArrayList<>();

        activityRequestDTO.getTimesheetDays().forEach(timesheetDay -> {
            DayOfTimesheet dayOfTimesheet = dayOfTimesheetService.create(timesheetDay);
            dayOfTimesheets.add(dayOfTimesheet);
        });

        validateProjectAndTaskNames(task, project, activityRequestDTO);
        taskBelongsToProject(task, project);

        update(this.modelMapper.map(activityRequestDTO, Activity.class), activity);
        Activity updatedActivity = this.activityRepository.save(activity);

        log.info("Updated successfully activity with id: {}", id);
        return this.modelMapper.map(updatedActivity, ActivityResponseDTO.class);
    }

    /**
     * Updates the activity entity
     *
     * @param updatedActivity the updated entity
     * @param oldActivity     the entity which should be updated
     */
    private void update(Activity updatedActivity, Activity oldActivity) {
        oldActivity.setProject(updatedActivity.getProject());
        oldActivity.setTask(updatedActivity.getTask());
    }

    /**
     * Gets a list of activities
     * 
     * @return list of response dto's
     */
    public List<ActivityResponseDTO> findAll() {

        return activityRepository.findAll()
                .stream()
                .map(activity -> modelMapper.map(activity, ActivityResponseDTO.class))
                .collect(Collectors.toUnmodifiableList());
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
