package com.mentormate.hackathon.persistence.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * This is basic class for each entity, because they must have id.
 * <p>
 * Created by Vladislav Penchev on 2020/09/30
 */
@Data
@MappedSuperclass
@NoArgsConstructor
public abstract class BaseEntity {

    @Id
    @Schema(description = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
