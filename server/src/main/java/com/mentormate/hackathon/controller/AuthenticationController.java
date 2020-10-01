package com.mentormate.hackathon.controller;

import com.mentormate.hackathon.service.AuthenticationService;
import com.mentormate.hackathon.service.dto.RegisterRequestDTO;
import com.mentormate.hackathon.service.dto.RegisterResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * {@link AuthenticationController} contains functionality to register user in the system
 * 
 * Created by Vladislav Penchev on 2020/09/30
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Operation(summary = "register", description = "This request method create user in database", tags = {"signUp"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User is created successfully"),
            @ApiResponse(responseCode = "400", description = "The request body is not correct"),
            @ApiResponse(responseCode = "409", description = "Entity already exists"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody @Valid RegisterRequestDTO registerRequestDTO) {
        return new ResponseEntity<>(authenticationService.registerUser(registerRequestDTO), HttpStatus.CREATED);
    }

}
