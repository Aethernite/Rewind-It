package com.mentormate.hackathon.controller;

import com.mentormate.hackathon.service.ProjectService;
import com.mentormate.hackathon.service.dto.ProjectResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The Project controller.
 *
 * <p>This controller is responsible for all of the CRUD operations of the Project entity
 *
 * @author Polina Usheva
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    /**
     * Get all response entities.
     *
     * @return the paged entities
     */
    @Operation(description = "This request is used for getting all of the projects ")
    @PreAuthorize("hasRole('ROLE_REGULAR')")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Returns all of the projects"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            })
    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects() {

        return new ResponseEntity<>(projectService.findAll(), HttpStatus.OK);
    }

    /**
     * Gets a project by id.
     *
     * @param id the project id
     * @return the project by id
     */
    @Operation(description = "This request is used for getting a project by id ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Returned the project successfully"),
                    @ApiResponse(responseCode = "404", description = "Project not found"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            })
    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable("id") @NotNull @Min(1) Long id) {
        return ResponseEntity.ok(projectService.getById(id));
    }
}
