package com.mentormate.hackathon.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.List;

/**
 * Created by Vladislav Penchev on 2020/10/02
 */

@Data
@Validated
@NoArgsConstructor
@AllArgsConstructor
public class TimesheetRequestDTO {
    List<ActivityRequestDTO> activities;
}
