package com.mentormate.hackathon.service;

import com.mentormate.hackathon.controller.handler.exception.IncorrectDataInput;
import com.mentormate.hackathon.controller.handler.exception.NotFoundException;
import com.mentormate.hackathon.persistence.entity.DayOfTimesheet;
import com.mentormate.hackathon.persistence.repository.DayOfTimesheetRepository;
import com.mentormate.hackathon.service.dto.DayOfTimesheetResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Represents the day of timesheet service. Contains all of the business logic.
 *
 * @author Polina Usheva
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DayOfTimesheetService {

    private final DayOfTimesheetRepository dayOfTimesheetRepository;

    private final ModelMapper modelMapper;

    /**
     * Gets day of timesheet by a page number and size
     *
     * @param page the page
     * @param size the number of entities per page
     * @return list of response dto's
     */
    public List<DayOfTimesheetResponseDTO> getAll(int page, int size) {

        return dayOfTimesheetRepository.findAll(PageRequest.of(page, size))
                .stream()
                .map(dayOfTimesheet -> modelMapper.map(dayOfTimesheet, DayOfTimesheetResponseDTO.class))
                .collect(Collectors.toUnmodifiableList());
    }

    /**
     * Gets day of timesheet by an id.
     *
     * @param id the day of timesheet id
     * @return the day of timesheet response dto by id
     */
    public DayOfTimesheetResponseDTO getById(Long id) {
        log.info("Get day of timesheet by id: {}", id);

        return this.dayOfTimesheetRepository
                .findById(id)
                .map(dayOfTimesheet -> this.modelMapper.map(dayOfTimesheet, DayOfTimesheetResponseDTO.class))
                .orElseThrow(() -> new NotFoundException(String.format("Day of timesheet with id %s - not found", id)));

    }

    /**
     * Finds all of the days of timesheets
     *
     * @return list of tasks
     */
    public List<DayOfTimesheet> findAll() {
        return dayOfTimesheetRepository.findAll();
    }

    public void validateDays(Set<DayOfTimesheet> timesheetDays) {

        for (DayOfTimesheet dayOfTimesheet : timesheetDays) {
            Optional<DayOfTimesheet> dayOfTimesheetOptional = dayOfTimesheetRepository.findById(dayOfTimesheet.getId());
            if (dayOfTimesheetOptional.isEmpty()) {
                throw new NotFoundException(String.format("Day of timesheet with id %s - not found", dayOfTimesheet.getId()));
            }
        }

        if (timesheetDays.size() > 7) {
            throw new IncorrectDataInput(String.format("Invalid number of days"));
        }
    }
}
