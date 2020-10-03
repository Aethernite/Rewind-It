package com.mentormate.hackathon.service;

import com.mentormate.hackathon.controller.handler.exception.EntityAlreadyExists;
import com.mentormate.hackathon.persistence.entity.Role;
import com.mentormate.hackathon.persistence.entity.RoleType;
import com.mentormate.hackathon.persistence.entity.User;
import com.mentormate.hackathon.persistence.repository.RoleRepository;
import com.mentormate.hackathon.persistence.repository.UserRepository;
import com.mentormate.hackathon.service.dto.LoginRequestDTO;
import com.mentormate.hackathon.service.dto.LoginResponseDTO;
import com.mentormate.hackathon.service.dto.RegisterRequestDTO;
import com.mentormate.hackathon.service.dto.RegisterResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Collection;
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
    private final AuthenticationManager authenticationManager;

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
        if (userRepository.findByEmail(registerRequestDTO.getEmail()).isPresent()) {
            throw new EntityAlreadyExists(String.format("Email %s already exist", registerRequestDTO.getEmail()));
        }
        User user = new User(registerRequestDTO.getEmail(), bCryptPasswordEncoder.encode(registerRequestDTO.getPassword()),
                Set.of(role));
        user = userRepository.save(user);
        log.info("Created user with email: {}", user.getEmail());
        return modelMapper.map(user, RegisterResponseDTO.class);
    }

    /**
     * Used for user login.
     *
     * @param loginRequestDTO    {@link LoginRequestDTO}
     * @param httpServletRequest current http servlet request
     * @return {@link LoginResponseDTO} contains information about user
     */
    public LoginResponseDTO loginUser(@Valid LoginRequestDTO loginRequestDTO, HttpServletRequest httpServletRequest) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword());
        Authentication authentication = authenticationManager.authenticate(auth);
        securityContext.setAuthentication(authentication);
        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
        return modelMapper.map(authentication.getPrincipal(), LoginResponseDTO.class);
    }

    /**
     * Used for user logout.
     *
     * @param httpServletRequest current request
     * @return {@link Map} with key message and value contains information about successful logout
     */
    public Map<String, String> logout(HttpServletRequest httpServletRequest) {
        httpServletRequest.getSession().invalidate();
        return Map.of("message", "logout successfully");
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
