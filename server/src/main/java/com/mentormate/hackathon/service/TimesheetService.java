package com.mentormate.hackathon.service;

import com.mentormate.hackathon.controller.handler.exception.NotFoundException;
import com.mentormate.hackathon.persistence.entity.Activity;
import com.mentormate.hackathon.persistence.entity.StatusType;
import com.mentormate.hackathon.persistence.entity.Timesheet;
import com.mentormate.hackathon.persistence.entity.User;
import com.mentormate.hackathon.persistence.repository.TimesheetRepository;
import com.mentormate.hackathon.service.dto.CreateTimesheetRequestDTO;
import com.mentormate.hackathon.service.dto.TimesheetResponseDTO;
import com.mentormate.hackathon.service.dto.TimesheetUpdateRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Vladislav Penchev on 2020/10/02
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class TimesheetService {

    private static final double DEFAULT_TIMESHEET_TOTAL = 0.0;

    private final ActivityService activityService;
    private final TimesheetRepository timesheetRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;

    public TimesheetResponseDTO createTimesheet(CreateTimesheetRequestDTO createTimesheetRequestDTO, String userEmail) {
        log.info("Start creating timesheet");
        User user = userService.checkIfUserExist(userEmail);
        Activity currentActivity = activityService.create(createTimesheetRequestDTO.getFromDate());
        Timesheet timesheet = new Timesheet(List.of(currentActivity), StatusType.OPEN, DEFAULT_TIMESHEET_TOTAL, user);
        TimesheetResponseDTO createTimesheetResponseDTO = modelMapper.map(timesheetRepository.save(timesheet), TimesheetResponseDTO.class);
        log.info("End creating timesheet and saved in database with id: {}", createTimesheetResponseDTO.getId());
        return createTimesheetResponseDTO;
    }

    public Page<TimesheetResponseDTO> getAll(int page, int size, String userEmail) {
        log.info("Fetch all timesheets");
        User user = userService.checkIfUserExist(userEmail);
        return timesheetRepository.findAllByUser_Id(PageRequest.of(page, size), user.getId()).map(timesheet -> modelMapper.map(timesheet, TimesheetResponseDTO.class));
    }

    public TimesheetResponseDTO getById(Long timesheetId, String userEmail) {
        log.info("Get timesheet by id: {}", timesheetId);
        User user = userService.checkIfUserExist(userEmail);
        Timesheet timesheet = checkIfTimesheetExists(timesheetId, user.getId());
        return modelMapper.map(timesheet, TimesheetResponseDTO.class);
    }

    public TimesheetResponseDTO updateTimesheetById(Long timesheetId, TimesheetUpdateRequestDTO timesheetUpdateRequestDTO,
                                                    String userEmail) {
        log.info("Start updating timesheet with id: {}", timesheetId);
        User user = userService.checkIfUserExist(userEmail);
        Timesheet timesheet = checkIfTimesheetExists(timesheetId, user.getId());
        List<Activity> activities = timesheetUpdateRequestDTO.getActivities()
                .stream().map(activity -> modelMapper.map(activity, Activity.class))
                .collect(Collectors.toList());
        timesheet.setActivities(activities);
        timesheet.setTotal(timesheetUpdateRequestDTO.getTotal());
        timesheet = timesheetRepository.save(timesheet);
        log.info("Updated timesheet with id: {}", timesheet);
        return modelMapper.map(timesheet, TimesheetResponseDTO.class);
    }

    public TimesheetResponseDTO updateTimesheetStatus(Long timesheetId, String userEmail) {
        log.info("Start updating timesheet with id: {}", timesheetId);
        User user = userService.checkIfUserExist(userEmail);
        Timesheet timesheet = checkIfTimesheetExists(timesheetId, user.getId());
        timesheet.setStatusType(StatusType.SUBMITTED);
        timesheet = timesheetRepository.save(timesheet);
        log.info("Updated timesheet with id: {}", timesheet);
        return modelMapper.map(timesheet, TimesheetResponseDTO.class);
    }

    public TimesheetResponseDTO deleteTimesheetById(Long timesheetId, String userEmail) {
        log.info("Start deleting timesheet with id: {}", timesheetId);
        User user = userService.checkIfUserExist(userEmail);
        Timesheet timesheet = checkIfTimesheetExists(timesheetId, user.getId());
        timesheetRepository.delete(timesheet);
        log.info("Deleted timesheet with id: {}", timesheetId);
        return modelMapper.map(timesheet, TimesheetResponseDTO.class);
    }

    private Timesheet checkIfTimesheetExists(Long timesheetId, Long userId) {
        return timesheetRepository.findByIdAndUser_Id(timesheetId, userId)
                .orElseThrow(() -> new NotFoundException(String.format("Timesheet with id %d of user with id %d is not found !", timesheetId, userId)));
    }
}
