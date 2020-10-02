package com.mentormate.hackathon.controller;

import com.mentormate.hackathon.service.DayOfTimesheetService;
import com.mentormate.hackathon.service.dto.DayOfTimesheetResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The DayOfTimesheet controller.
 *
 * <p>This controller is responsible for all of the CRUD operations of the DayOfTimesheet entity
 *
 * @author Polina Usheva
 */
@RestController
@RequestMapping("/api/v1/daysOfTimesheets")
@RequiredArgsConstructor
public class DayOfTimesheetController {

    private final DayOfTimesheetService dayOfTimesheetService;

    /**
     * Get all response entities by page.
     *
     * @param page the number of the page
     * @param size the number of entities per page
     * @return the paged entities
     */
    @Operation(description = "This request is used for getting all of the day of timesheets ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Returns all of the days of timesheets"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            })
    @GetMapping(params = {"page", "size"})
    public ResponseEntity<List<DayOfTimesheetResponseDTO>> getAllDaysOfTimesheets(
            @RequestParam("page") int page, @RequestParam("size") int size) {

        return new ResponseEntity<>(dayOfTimesheetService.getAll(page, size), HttpStatus.OK);
    }

    /**
     * Gets a day of timesheet by id.
     *
     * @param id the day of timesheet id
     * @return the dat of timesheet by id
     */
    @Operation(description = "This request is used for getting a day of timesheet by id ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Returned the day of timesheet successfully"),
                    @ApiResponse(responseCode = "404", description = "Day of timesheet not found"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            })
    @GetMapping("/{id}")
    public ResponseEntity<DayOfTimesheetResponseDTO> getProjectById(@PathVariable("id") @NotNull @Min(1) Long id) {
        return ResponseEntity.ok(dayOfTimesheetService.getById(id));
    }
}
