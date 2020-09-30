package com.mentormate.hackathon.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This class represents the register response dto
 * 
 * Created by Vladislav Penchev on 2020/09/30
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponseDTO {
    @Schema(name = "id", description = "id of user")
    private String id;

    @Schema(name = "username", description = "username of user")
    private String username;

}
