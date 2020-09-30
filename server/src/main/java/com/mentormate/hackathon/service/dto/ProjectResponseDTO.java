package com.mentormate.hackathon.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This class represents the Project response dto
 *
 * @author Polina Usheva
 */
@Data
@NoArgsConstructor
public class ProjectResponseDTO {

    @Schema(name = "id", description = "Id of project")
    private Long id;

    @Schema(name = "name", description = "Name of project")
    private String name;
}
