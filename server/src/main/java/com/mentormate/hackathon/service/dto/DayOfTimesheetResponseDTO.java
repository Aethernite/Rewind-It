package com.mentormate.hackathon.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * This class represents the Project response dto
 *
 * @author Polina Usheva
 */
@Data
@NoArgsConstructor
public class DayOfTimesheetResponseDTO {

    @Schema(name = "id", description = "Id of day of timesheet")
    private Long id;

    @Schema(name = "date", description = "Date of activity")
    private LocalDate date;

    @Schema(name = "hours", description = "Hours of activity")
    private Integer hours;

}
