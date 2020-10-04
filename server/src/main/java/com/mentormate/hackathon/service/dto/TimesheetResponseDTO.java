package com.mentormate.hackathon.service.dto;

import com.mentormate.hackathon.persistence.entity.Activity;
import com.mentormate.hackathon.persistence.entity.StatusType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

/**
 * Created by Vladislav Penchev on 2020/10/02
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimesheetResponseDTO {

    private Long id;
    
    private LocalDate from;

    private LocalDate to;

    private StatusType statusType;

    private List<Activity> activities;

    private double total;
}
