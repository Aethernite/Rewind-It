package com.mentormate.hackathon.persistence.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

/**
 * Created by Vladislav Penchev on 2020/10/02
 */
@Data
@Entity
@AllArgsConstructor
@Table(name = "timesheets")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Timesheet extends BaseEntity {

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "timesheet_id")
    private List<Activity> activities;

    @Enumerated(EnumType.STRING)
    private StatusType statusType;

    @Column
    private double total;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
