package com.mentormate.hackathon.controller;

import com.mentormate.hackathon.service.ProjectService;
import com.mentormate.hackathon.service.dto.response.ProjectResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
@RequiredArgsConstructor
@RequestMapping("/api/v1/projects")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8080","http://80.208.228.216","http://rewind-it.eu","https://rewind-it.eu","http://www.rewind-it.eu","https://www.rewind-it.eu"})
public class ProjectController {

    private final ProjectService projectService;

    @Operation(description = "This request is used for getting all of the projects", tags = {"Projects"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns all of the projects"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects() {
        return ResponseEntity.ok(projectService.findAll());
    }

}
