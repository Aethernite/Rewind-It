package com.mentormate.hackathon.controller;

import com.mentormate.hackathon.controller.handler.exception.UnAuthorizedException;
import com.mentormate.hackathon.service.TimesheetService;
import com.mentormate.hackathon.service.dto.CreateTimesheetRequestDTO;
import com.mentormate.hackathon.service.dto.TimesheetResponseDTO;
import com.mentormate.hackathon.service.dto.TimesheetUpdateRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.security.Principal;

/**
 * Created by Vladislav Penchev on 2020/10/02
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/timesheets")
public class TimesheetController {

    private final TimesheetService timesheetService;

    @Operation(summary = "Create timesheet", description = "This request method is used for creating new timesheet", tags = {"Timesheet"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Timesheet is created successfully"),
            @ApiResponse(responseCode = "400", description = "The request body is not correct"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping
    public ResponseEntity<TimesheetResponseDTO> createTimesheet(@Valid @RequestBody CreateTimesheetRequestDTO createTimesheetRequestDTO,
                                                                Principal principal) {
        if (principal == null) {
            throw new UnAuthorizedException("Unauthorized");
        }
        return new ResponseEntity<>(timesheetService.createTimesheet(createTimesheetRequestDTO, principal.getName()), HttpStatus.CREATED);
    }

    @Operation(summary = "Get all timesheets", description = "This request method return all timesheets", tags = {"Timesheet"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Return all timesheets"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping(params = {"page", "size"})
    public ResponseEntity<Page<TimesheetResponseDTO>> getAllTimesheets(
            @Parameter(description = "Page number") @RequestParam(value = "page") int page,
            @Parameter(description = "Size number - how many items to return") @RequestParam("size") int size,
            Principal principal) {
        if (principal == null) {
            throw new UnAuthorizedException("Unauthorized");
        }
        return ResponseEntity.ok(timesheetService.getAll(page, size, principal.getName()));
    }

    @Operation(summary = "Get timesheet by id", description = "This request method return timesheet by id", tags = {"Timesheet"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Return timesheet"),
            @ApiResponse(responseCode = "404", description = "Timesheet not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/{timesheetId}")
    public ResponseEntity<TimesheetResponseDTO> getTimesheetById(
            @Parameter(description = "Id of the timesheet to be obtained.")
            @PathVariable("timesheetId") @NotBlank @Size(min = 1) Long timesheetId,
            Principal principal) {
        if (principal == null) {
            throw new UnAuthorizedException("Unauthorized");
        }
        return ResponseEntity.ok(timesheetService.getById(timesheetId, principal.getName()));
    }

    @Operation(summary = "Update timesheet by id", description = "This request method update timesheet by id", tags = {"Timesheet"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Return updated timesheet"),
            @ApiResponse(responseCode = "400", description = "The request body is not correct"),
            @ApiResponse(responseCode = "404", description = "Timesheet not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PutMapping("/{timesheetId}")
    public ResponseEntity<TimesheetResponseDTO> updateTimesheetById(
            @Parameter(description = "Id of the timesheetId to be obtained.")
            @PathVariable("timesheetId") @NotBlank @Size(min = 1) Long timesheetId, @Valid @RequestBody TimesheetUpdateRequestDTO timesheetUpdateRequestDTO,
            Principal principal) {
        if (principal == null) {
            throw new UnAuthorizedException("Unauthorized");
        }
        return ResponseEntity.ok(timesheetService.updateTimesheetById(timesheetId, timesheetUpdateRequestDTO, principal.getName()));
    }

    @Operation(summary = "Update status of timesheet by id", description = "This request method update status of timesheet by id", tags = {"Timesheet"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Return updated timesheet"),
            @ApiResponse(responseCode = "400", description = "The request body is not correct"),
            @ApiResponse(responseCode = "404", description = "Timesheet not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PutMapping("/{timesheetId}/submit")
    public ResponseEntity<TimesheetResponseDTO> updateTimesheetStatusById(
            @Parameter(description = "Id of the timesheetId to be obtained.")
            @PathVariable("timesheetId") @NotBlank @Size(min = 1) Long timesheetId, Principal principal) {
        if (principal == null) {
            throw new UnAuthorizedException("Unauthorized");
        }
        return ResponseEntity.ok(timesheetService.updateTimesheetStatus(timesheetId, principal.getName()));
    }

    @Operation(summary = "Delete timesheet by id", description = "This request method delete timesheet by id", tags = {"Timesheet"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Deleted timesheet"),
            @ApiResponse(responseCode = "404", description = "Timesheet not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @DeleteMapping("/{timesheetId}")
    public ResponseEntity<TimesheetResponseDTO> deleteTimesheetById(
            @Parameter(description = "Id of the timesheet to be obtained.")
            @PathVariable("timesheetId") @NotBlank @Size(min = 1) Long timesheetId, Principal principal) {
        if (principal == null) {
            throw new UnAuthorizedException("Unauthorized");
        }
        return ResponseEntity.ok(timesheetService.deleteTimesheetById(timesheetId, principal.getName()));
    }
}