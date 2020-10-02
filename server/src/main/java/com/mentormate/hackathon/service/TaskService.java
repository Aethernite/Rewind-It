package com.mentormate.hackathon.service;

import com.mentormate.hackathon.controller.handler.exception.NotFoundException;
import com.mentormate.hackathon.persistence.entity.Task;
import com.mentormate.hackathon.persistence.entity.TypeOfTask;
import com.mentormate.hackathon.persistence.repository.TaskRepository;
import com.mentormate.hackathon.service.dto.TaskResponseDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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
     * Finds all of the tasks
     *
     * @return list of tasks
     */
    public List<Task> findAll() {

        return taskRepository.findAll();
    }

    /**
     * Finds a task by a name
     *
     * @param name the name of the task
     * @return the task
     */
    public Task getByName(TypeOfTask name) {

        Optional<Task> taskOptional = taskRepository.findByName(name);

        if (taskOptional.isEmpty()) {
            throw new NotFoundException(String.format("Task with name %s not found ", name));
        }

        return taskOptional.get();
    }

    /**
     * Gets a task by a page number and size
     *
     * @param page the page
     * @param size the number of entities per page
     * @return list of response dto's
     */
    public List<TaskResponseDTO> getAll(int page, int size) {

        return taskRepository.findAll(PageRequest.of(page, size))
                .stream()
                .map(feature -> modelMapper.map(feature, TaskResponseDTO.class))
                .collect(Collectors.toUnmodifiableList());
    }

    /**
     * Seed all tasks in database
     */
    public void seedTasks() {
        if (taskRepository.findAll().isEmpty()) {
            Task administrative = new Task(TypeOfTask.ADMINISTRATIVE);
            taskRepository.save(administrative);

            Task benchTime = new Task(TypeOfTask.BENCH_TIME);
            taskRepository.save(benchTime);

            Task learning = new Task(TypeOfTask.LEARNING);
            taskRepository.save(learning);

            Task research = new Task(TypeOfTask.RESEARCH);
            taskRepository.save(research);

        }
    }

    /**
     * Finds a task by a name
     *
     * @param name the name of the task
     * @return the task
     */
    public Task getByName(TypeOfTask name) {

        Optional<Task> taskOptional = taskRepository.findByName(name);

        if (taskOptional.isEmpty()) {
            throw new NotFoundException(String.format("Task with name %s not found ", name));
        }

        return taskOptional.get();
    }

}
