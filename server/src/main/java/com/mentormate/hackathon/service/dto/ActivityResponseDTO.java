package com.mentormate.hackathon.service.dto;

import com.mentormate.hackathon.persistence.entity.Project;
import com.mentormate.hackathon.persistence.entity.Task;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}