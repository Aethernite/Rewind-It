package com.mentormate.hackathon.service.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.mentormate.hackathon.utils.ParseDeserializer;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;

/**
 * This class represents the Day of timesheets request dto
 *
 * @author Polina Usheva
 */
@Data
@Validated
@NoArgsConstructor
public class DayOfTimesheetRequestDTO {

    @JsonSerialize(using = ToStringSerializer.class)
    @JsonDeserialize(using = ParseDeserializer.class)
    private LocalDateTime date;

    @Size.List({
            @Size(min = 0, message = "The hours must be greater than 0."),
            @Size(max = 24, message = "The hours must be less than 24.")
    })
    private Integer hours;

}
