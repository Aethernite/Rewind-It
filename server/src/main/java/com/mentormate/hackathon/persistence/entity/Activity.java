package com.mentormate.hackathon.persistence.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;

/**
 * The Activity entity class.
 *
 * @author Polina Usheva
 */
@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "activities")
public class Activity extends BaseEntity {

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "task_id", referencedColumnName = "id")
    private Task task;
    
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id")
    private List<DayOfTimesheet> timesheetDays;
}
