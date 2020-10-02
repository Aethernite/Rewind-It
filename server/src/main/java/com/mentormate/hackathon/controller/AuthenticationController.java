package com.mentormate.hackathon.controller;

import com.mentormate.hackathon.service.AuthenticationService;
import com.mentormate.hackathon.service.dto.LoginRequestDTO;
import com.mentormate.hackathon.service.dto.LoginResponseDTO;
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

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

/**
 * {@link AuthenticationController} contains functionality to register user in the system
 * <p>
 * Created by Vladislav Penchev on 2020/09/30
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Operation(summary = "login", description = "This request method login user", tags = {"Login"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Return user info"),
            @ApiResponse(responseCode = "400", description = "The request body is not correct"),
            @ApiResponse(responseCode = "401", description = "Authentication Failure"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO, HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(authenticationService.loginUser(loginRequestDTO, httpServletRequest));
    }

    @Operation(summary = "register", description = "This request method create user in database", tags = {"Register"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User is created successfully"),
            @ApiResponse(responseCode = "400", description = "The request body is not correct"),
            @ApiResponse(responseCode = "409", description = "Entity already exists"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody @Valid RegisterRequestDTO registerRequestDTO) {
        return new ResponseEntity<>(authenticationService.registerUser(registerRequestDTO), HttpStatus.CREATED);
    }

    @Operation(summary = "logout", description = "This request method logout user.", tags = {"Logout"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User is logout successfully"),
            @ApiResponse(responseCode = "403", description = "Operation is forbidden"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(authenticationService.logout(httpServletRequest));
    }

}
