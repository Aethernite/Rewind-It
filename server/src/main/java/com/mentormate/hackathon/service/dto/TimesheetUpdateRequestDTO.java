package com.mentormate.hackathon.service.dto;

import com.mentormate.hackathon.persistence.entity.StatusType;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class TimesheetUpdateRequestDTO {
    
    List<ActivityUpdateRequestDTO> activities;

    private StatusType statusType;

    private double total;
}
