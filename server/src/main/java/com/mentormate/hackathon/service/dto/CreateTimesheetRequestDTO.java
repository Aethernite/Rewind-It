package com.mentormate.hackathon.service.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.mentormate.hackathon.utils.ParseDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;

/**
 * Created by Vladislav Penchev on 2020/10/02
 */

@Data
@Validated
@NoArgsConstructor
@AllArgsConstructor
public class CreateTimesheetRequestDTO {

    @JsonSerialize(using = ToStringSerializer.class)
    @JsonDeserialize(using = ParseDeserializer.class)
    private LocalDateTime fromDate;
}
