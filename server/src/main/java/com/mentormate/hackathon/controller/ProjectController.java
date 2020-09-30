package com.mentormate.hackathon.controller;

import com.mentormate.hackathon.service.ProjectService;
import com.mentormate.hackathon.service.dto.ProjectResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * The Project controller.
 *
 * <p>This controller is responsible for all of the CRUD operations of the Project entity
 *
 * @author Polina Usheva
 */
@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    
    /**
     * Get all response entities by page.
     *
     * @param page the number of the page
     * @param size the number of entities per page
     * @return the paged entities
     */
    @Operation(description = "This request is used for getting all of the projects ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Returns all of the projects"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            })
    @GetMapping(params = {"page", "size"})
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects(
            @RequestParam("page") int page, @RequestParam("size") int size) {

        return new ResponseEntity<>(projectService.findAll(page, size), HttpStatus.OK);
    }
}
