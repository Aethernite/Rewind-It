package com.mentormate.hackathon.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;

/**
 * Represents the Project dto
 *
 * @author Polina Usheva
 */
@Getter
@Setter
@Validated
@NoArgsConstructor
public class ProjectDto {

    @Schema(name = "name", description = "The name of the project")
    @NotNull(message = "The project cannot be null")
    @NotBlank(message = "The project cannot be blank")
    private String name;
}
