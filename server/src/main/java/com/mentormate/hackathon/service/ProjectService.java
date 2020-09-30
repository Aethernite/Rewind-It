package com.mentormate.hackathon.service;

import com.mentormate.hackathon.persistence.repository.ProjectRepository;
import com.mentormate.hackathon.service.dto.ProjectDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Represents the project service. Contains all of the business logic.
 */
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ModelMapper modelMapper;

    /**
     * Gets a project by a page number and size
     *
     * @param page the page
     * @param size the number of entities per page
     * @return list of response dto's
     */
    public List<ProjectDto> findAll(int page, int size) {

        return projectRepository.findAll(PageRequest.of(page, size))
                .stream()
                .map(feature -> modelMapper.map(feature, ProjectDto.class))
                .collect(Collectors.toUnmodifiableList());

    }

}
