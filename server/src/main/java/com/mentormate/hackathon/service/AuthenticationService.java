package com.mentormate.hackathon.service;

import com.mentormate.hackathon.controller.handler.exception.EntityAlreadyExists;
import com.mentormate.hackathon.persistence.entity.Role;
import com.mentormate.hackathon.persistence.entity.RoleType;
import com.mentormate.hackathon.persistence.entity.User;
import com.mentormate.hackathon.persistence.repository.RoleRepository;
import com.mentormate.hackathon.persistence.repository.UserRepository;
import com.mentormate.hackathon.service.dto.RegisterRequestDTO;
import com.mentormate.hackathon.service.dto.RegisterResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * {@link AuthenticationService} that contains all business logic about user authentication
 * <p>
 * Created by Vladislav Penchev on 2020/09/30
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private static final Map<RoleType, Role> ROLES = new HashMap<>();

    /**
     * Seed all roles in database when {@link AuthenticationService} is add in spring context.
     */
    @PostConstruct
    protected void postConstruct() {
        this.seedRoles();
        roleRepository.findAll()
                .forEach(role -> ROLES.put(role.getName(), role));
    }

    /**
     * Used for create user registration.
     *
     * @param registerRequestDTO used for user register
     * @return {@link RegisterResponseDTO}
     */
    public RegisterResponseDTO registerUser(RegisterRequestDTO registerRequestDTO) {
        Role role = ROLES.get(RoleType.ROLE_REGULAR);
        if (userRepository.findByUsername(registerRequestDTO.getUsername()).isPresent()) {
            throw new EntityAlreadyExists(String.format("Username %s already exist", registerRequestDTO.getUsername()));
        }
        User user = new User(registerRequestDTO.getUsername(), bCryptPasswordEncoder.encode(registerRequestDTO.getPassword()),
                Set.of(role));
        user = userRepository.save(user);
        log.info("Created user with username: {}", user.getUsername());
        return modelMapper.map(user, RegisterResponseDTO.class);
    }

    /**
     * Seed all roles in database
     */
    private void seedRoles() {
        if (roleRepository.findAll().isEmpty()) {
            Role roleRegular = new Role(RoleType.ROLE_REGULAR);
            roleRepository.save(roleRegular);
        }
    }

}
