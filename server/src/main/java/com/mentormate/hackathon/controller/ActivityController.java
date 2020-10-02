package com.mentormate.hackathon.controller;

import com.mentormate.hackathon.service.ActivityService;
import com.mentormate.hackathon.service.dto.ActivityRequestDTO;
import com.mentormate.hackathon.service.dto.ActivityResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The Activity controller.
 *
 * <p>This controller is responsible for all of the CRUD operations of the Activity entity
 *
 * @author Polina Usheva
 */
@RestController
@RequestMapping("/api/v1/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    /**
     * Get all response entities by page.
     *
     * @param page the number of the page
     * @param size the number of entities per page
     * @return the paged entities
     */
    @Operation(description = "This request is used for getting all of the activities ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Returns all of the activities"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            })
    @GetMapping
    public ResponseEntity<List<ActivityResponseDTO>> getAllActivities(
            @RequestParam("page") int page, @RequestParam("size") int size) {

        return new ResponseEntity<>(activityService.findAll(page, size), HttpStatus.OK);
    }

    /**
     * Gets an activity by id.
     *
     * @param id the activity id
     * @return the activity by id
     */
    @Operation(description = "This request is used for getting an activity by id ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Returned the activity successfully"),
                    @ApiResponse(responseCode = "404", description = "Activity not found"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            })
    @GetMapping("/{id}")
    public ResponseEntity<ActivityResponseDTO> getActivityById(@PathVariable("id") @NotNull @Min(1) Long id) {
        return ResponseEntity.ok(activityService.getById(id));
    }

    /**
     * Creates a activity response entity.
     *
     * @param activityRequestDTO the request
     * @return the response entity
     */
    @Operation(description = "This request is used for creating activities ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "201", description = "Activity is created successfully"),
                    @ApiResponse(responseCode = "400", description = "Incorrect request body"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            })
    @PostMapping
    public ResponseEntity<ActivityResponseDTO> createActivity(@Valid @RequestBody ActivityRequestDTO activityRequestDTO) {
        return new ResponseEntity<>(this.activityService.create(activityRequestDTO), HttpStatus.CREATED);
    }

    /**
     * Delete an activity by id.
     *
     * @param id the activity id
     * @return the response entity
     */
    @Operation(description = "This request is used for deleting a activity by id ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "204", description = "Deleted an activity successfully"),
                    @ApiResponse(responseCode = "404", description = "Activity not found"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            })
    @DeleteMapping("/{id}")
    public ResponseEntity<ActivityResponseDTO> deleteActivityByIId(@PathVariable("id") @NotNull @Min(1) Long id) {
        return new ResponseEntity<>(this.activityService.delete(id), HttpStatus.OK);
    }

    /**
     * Update an activity by id.
     *
     * @param id                 the activity id
     * @param activityRequestDTO the activity dto
     * @return the response entity
     */
    @Operation(description = "This request is used for updating an activity by id ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return updated activity"),
                    @ApiResponse(responseCode = "400", description = "Incorrect request body"),
                    @ApiResponse(responseCode = "404", description = "Activity not found"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            })
    @PutMapping("/{id}")
    public ResponseEntity<ActivityResponseDTO> updateActivityById(@PathVariable("id") @NotNull @Min(1) Long id,
                                                                  @Valid @RequestBody ActivityRequestDTO activityRequestDTO) {
        return new ResponseEntity<>(this.activityService.updateById(id, activityRequestDTO), HttpStatus.OK);
    }
}
