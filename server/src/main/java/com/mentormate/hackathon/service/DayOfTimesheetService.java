package com.mentormate.hackathon.service;

import com.mentormate.hackathon.controller.handler.exception.NotFoundException;
import com.mentormate.hackathon.persistence.entity.DayOfTimesheet;
import com.mentormate.hackathon.persistence.repository.DayOfTimesheetRepository;
import com.mentormate.hackathon.service.dto.response.DayOfTimesheetResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
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

    private static final int DAYS_OF_WEEK = 7;
    private static final int DEFAULT_HOURS = 0;
    private static final int INDEX_OF_INCREMENT_OF_DAY = 1;

    private final DayOfTimesheetRepository dayOfTimesheetRepository;

    private final ModelMapper modelMapper;

    /**
     * Creates a new day of timesheet.
     *
     * @param fromDate
     * @return the day of timesheet entity
     */
    public List<DayOfTimesheet> create(LocalDateTime fromDate) {
        Date convertedFromDateToDate = Date.from(fromDate.atZone(ZoneId.systemDefault()).toInstant());
        List<DayOfTimesheet> dayOfTimesheets = new ArrayList<>();
        Calendar calend = Calendar.getInstance();
        calend.setTime(convertedFromDateToDate);

        for (int i = 0; i < DAYS_OF_WEEK; i++) {
            TimeZone timeZone = calend.getTimeZone();
            ZoneId zoneId = timeZone == null ? ZoneId.systemDefault() : timeZone.toZoneId();
            LocalDateTime currentDate = LocalDateTime.ofInstant(calend.toInstant(), zoneId);
            DayOfTimesheet currentDayOfTimesheet = new DayOfTimesheet(currentDate, DEFAULT_HOURS);
            dayOfTimesheets.add(currentDayOfTimesheet);
            calend.add(Calendar.DAY_OF_YEAR, INDEX_OF_INCREMENT_OF_DAY);
        }

        return this.dayOfTimesheetRepository.saveAll(dayOfTimesheets);
    }

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
}
