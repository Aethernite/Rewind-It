package com.mentormate.hackathon.service.dto;

import com.mentormate.hackathon.persistence.entity.DayOfTimesheet;
import com.mentormate.hackathon.persistence.entity.Project;
import com.mentormate.hackathon.persistence.entity.Task;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.List;

/**
 * Created by Vladislav Penchev on 2020/10/03
 */
@Data
@Validated
@NoArgsConstructor
public class ActivityUpdateRequestDTO {
    private Long id;

    private Project project;

    private Task task;

    private List<DayOfTimesheet> timesheetDays;
}
