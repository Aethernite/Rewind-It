package com.mentormate.hackathon.service;

import com.mentormate.hackathon.controller.handler.exception.NotFoundException;
import com.mentormate.hackathon.persistence.entity.Project;
import com.mentormate.hackathon.persistence.entity.Task;
import com.mentormate.hackathon.persistence.entity.TypeOfTask;
import com.mentormate.hackathon.persistence.repository.ProjectRepository;
import com.mentormate.hackathon.service.dto.ProjectResponseDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Represents the project service. Contains all of the business logic.
 *
 * @author Polina Usheva
 */
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final TaskService taskService;

    private final ProjectRepository projectRepository;

    private final ModelMapper modelMapper;

    /**
     * Seed all projects and tasks in database.
     */
    @PostConstruct
    protected void postConstruct() {
        taskService.seedTasks();
        this.seedProjects();
    }

    /**
     * Gets a project by a page number and size
     *
     * @param page the page
     * @param size the number of entities per page
     * @return list of response dto's
     */
    public List<ProjectResponseDTO> findAll(int page, int size) {

        return projectRepository.findAll(PageRequest.of(page, size))
                .stream()
                .map(feature -> modelMapper.map(feature, ProjectResponseDTO.class))
                .collect(Collectors.toUnmodifiableList());
    }

    /**
     * Seed all projects in database
     */
    private void seedProjects() {

        if (projectRepository.findAll().isEmpty()) {

            Task learning = taskService.findByName(TypeOfTask.LEARNING);

            Project clientSatisfaction1 =
                    new Project("MentorMate L&D : Client Satisfaction & Communication Part 1 Training",
                            Set.of(learning));

            Project clientSatisfaction2 =
                    new Project("MentorMate L&D : Client Satisfaction & Communication Part 2 Training",
                            Set.of(learning));

            projectRepository.save(clientSatisfaction1);
            projectRepository.save(clientSatisfaction2);

            List<Task> taskList = taskService.findAll();
            Set<Task> taskSet = new HashSet<>(taskList);

            Project devcamp2 = new Project("MentorMate L&D : 2020.2.Devcamp", taskSet);
            projectRepository.save(devcamp2);

        }
    }
    
    /**
     * Gets project by an id.
     *
     * @param id the project id
     * @return the project response dto by id
     */
    public ProjectResponseDTO getById(Long id) {
        log.info("Get project by id: {}", id);

        return this.projectRepository
                .findById(id)
                .map(project -> this.modelMapper.map(project, ProjectResponseDTO.class))
                .orElseThrow(() -> new NotFoundException(String.format("Project with id %s - not found", id)));

    }

    /**
     * Returns a project, when searched by id.
     *
     * @param id the id of the wanted project
     * @return the project entity
     */
    public Project find(Long id) {
        return projectRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Project with id: %s - not found", id)));
    }

    /**
     * Returns a project, when searched by name.
     *
     * @param name the name of the wanted project
     * @return the project entity
     */
    public Project findByName(String name) {
        return projectRepository
                .findByName(name)
                .orElseThrow(() -> new NotFoundException(String.format("Project with name: %s - not found ", name)));
    }

}
