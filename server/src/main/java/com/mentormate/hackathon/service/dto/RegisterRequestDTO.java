package com.mentormate.hackathon.service.dto;

import com.mentormate.hackathon.validate.NotSamePassword;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * This class represents the register request dto
 * 
 * Created by Vladislav Penchev on 2020/09/30
 */
@Data
@Validated
@NoArgsConstructor
@AllArgsConstructor
@NotSamePassword.List({
        @NotSamePassword(
                password = "password",
                confirmPassword = "confirmPassword",
                message = "Password not match confirm password"
        )
})
public class RegisterRequestDTO {

    @NotBlank(message = "Username must not be empty.")
    @Size.List({
            @Size(min = 5, message = "Username must be greater than 5 length of characters."),
            @Size(max = 30, message = "Username must be less than 30 length of characters.")
    })
    @Schema(name = "username", description = "username of user")
    private String username;

    @NotBlank(message = "Password must not be empty.")
    @Size.List({
            @Size(min = 6, message = "Password must be greater than 6 length of characters."),
            @Size(max = 20, message = "Password must be less than 20 length of characters.")
    })
    @Schema(name = "password", description = "password of user")
    private String password;

    @NotBlank(message = "Confirm password must not be empty.")
    @Schema(name = "confirmPassword", description = "confirm password of user by registration")
    private String confirmPassword;

}
