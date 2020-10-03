package com.mentormate.hackathon.service.dto;

import com.mentormate.hackathon.persistence.entity.Activity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Created by Vladislav Penchev on 2020/10/02
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimesheetResponseDTO {

    private Long id;
    
    List<Activity> activities;
}
