package com.mentormate.hackathon.service;

import com.mentormate.hackathon.persistence.entity.Activity;
import com.mentormate.hackathon.persistence.entity.Timesheet;
import com.mentormate.hackathon.persistence.repository.TimesheetRepository;
import com.mentormate.hackathon.service.dto.TimesheetRequestDTO;
import com.mentormate.hackathon.service.dto.TimesheetResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Vladislav Penchev on 2020/10/02
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class TimesheetService {
    private final ActivityService activityService;
    private final TimesheetRepository timesheetRepository;
    private final ModelMapper modelMapper;

    public String createTimesheet(TimesheetRequestDTO timesheetRequestDTO) {
        List<Activity> activities = new ArrayList<>();

        timesheetRequestDTO.getActivities()
                .stream()
                .forEach(activity -> {
                    Activity currentActivity = activityService.create(activity);
                    activities.add(currentActivity);
                });
        Timesheet timesheet = new Timesheet(activities);
        timesheetRepository.save(timesheet);
        return "";
    }

    public List<TimesheetResponseDTO> getAll(int page, int size) {
//        log.info("Fetch all features");
        List<Timesheet> all = timesheetRepository.findAll(PageRequest.of(page, size)).getContent();
        List<TimesheetResponseDTO> collect = all.stream()
                .map(timesheet -> modelMapper.map(timesheet, TimesheetResponseDTO.class))
                .collect(Collectors.toUnmodifiableList());

//        return new PageImpl<TimesheetResponseDTO>(all
//                .stream()
//                .map(TimesheetResponseDTO -> new TimesheetResponseDTO(
//                        
//                        person.getId(),
//                        person.getFirstName(),
//                        person.getLastName(),
//                        person.getNumberMobil(),
//                        person.getPresentPosition()))
//                .collect(Collectors.toList()));

//        List<TimesheetResponseDTO> collect = all
//                .stream()
//                .map(activity -> modelMapper.map(activity, TimesheetResponseDTO.class))
//                .collect(Collectors.toUnmodifiableList());

        return collect;
    }

    public TimesheetResponseDTO getById(Long timesheetId) {
        log.info("Get timesheet by id: {}", timesheetId);
        Timesheet timesheet = checkIfTimesheetExists(timesheetId);
        return modelMapper.map(timesheet, TimesheetResponseDTO.class);
    }

    public TimesheetResponseDTO updateTimesheetById(Long timesheetId, TimesheetRequestDTO timesheetRequestDTO) {
        log.info("Start updating timesheet with id: {}", timesheetId);
        Timesheet timesheet = checkIfTimesheetExists(timesheetId);
        timesheet = timesheetRepository.save(timesheet);
        log.info("Updated timesheet with id: {}", timesheet);
        return modelMapper.map(timesheet, TimesheetResponseDTO.class);
    }

    private Timesheet checkIfTimesheetExists(Long timesheetId) {
        return timesheetRepository.findById(timesheetId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Timesheet with id %d is not found !", timesheetId)));
    }
}
