package com.mentormate.hackathon.service;

import com.mentormate.hackathon.persistence.repository.TaskRepository;
import com.mentormate.hackathon.service.dto.TaskResponseDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Represents the task service. Contains all of the business logic.
 *
 * @author Polina Usheva
 */
@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;

    /**
     * Gets a task by a page number and size
     *
     * @param page the page
     * @param size the number of entities per page
     * @return list of response dto's
     */
    public List<TaskResponseDTO> findAll(int page, int size) {

        return taskRepository.findAll(PageRequest.of(page, size))
                .stream()
                .map(feature -> modelMapper.map(feature, TaskResponseDTO.class))
                .collect(Collectors.toUnmodifiableList());
    }
}
