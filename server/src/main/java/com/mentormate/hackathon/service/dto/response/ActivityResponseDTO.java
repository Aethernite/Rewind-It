package com.mentormate.hackathon.service.dto.response;

import com.mentormate.hackathon.persistence.entity.DayOfTimesheet;
import com.mentormate.hackathon.persistence.entity.Project;
import com.mentormate.hackathon.persistence.entity.Task;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * This class represents the Activity response dto
 *
 * @author Polina Usheva
 */
@Data
@NoArgsConstructor
public class ActivityResponseDTO {

    private Long id;

    private Project project;

    private Task task;

    private List<DayOfTimesheet> timesheetDays;
}
