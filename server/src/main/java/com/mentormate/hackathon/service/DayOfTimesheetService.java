package com.mentormate.hackathon.service;

import com.mentormate.hackathon.controller.handler.exception.NotFoundException;
import com.mentormate.hackathon.persistence.entity.DayOfTimesheet;
import com.mentormate.hackathon.persistence.repository.DayOfTimesheetRepository;
import com.mentormate.hackathon.service.dto.DayOfTimesheetResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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

    private final DayOfTimesheetRepository dayOfTimesheetRepository;

    private final ModelMapper modelMapper;

    /**
     * Creates a new day of timesheet.
     *
     * @param fromDate
     * @return the day of timesheet entity
     */
    public List<DayOfTimesheet> create(LocalDateTime fromDate) {
        Date convertedDatetime = Date.from(fromDate.atZone(ZoneId.systemDefault()).toInstant());
        List<DayOfTimesheet> dayOfTimesheets = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.setTime(convertedDatetime);

        for (int i = 0; i < 7; i++) {
            TimeZone tz = cal.getTimeZone();
            ZoneId zid = tz == null ? ZoneId.systemDefault() : tz.toZoneId();
            LocalDateTime localDateTime = LocalDateTime.ofInstant(cal.toInstant(), zid);
            DayOfTimesheet currentDayOfTimesheet = new DayOfTimesheet(localDateTime, 0);
            dayOfTimesheets.add(currentDayOfTimesheet);
            cal.add(Calendar.DAY_OF_YEAR, 1);
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
