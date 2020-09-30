package com.mentormate.hackathon.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * This configuration is responsible to create and configure {@link BCryptPasswordEncoder}
 * <p>
 * Created by Vladislav Penchev on 2020/09/30
 */
@Configuration
public class BCryptPasswordEncoderConfiguration {

    /**
     * Register this bean in spring context with scope singleton(default)
     */
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
