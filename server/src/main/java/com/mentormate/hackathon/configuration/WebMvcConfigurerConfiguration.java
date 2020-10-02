package com.mentormate.hackathon.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Allow frontend to be accessed
 * <p>
 * Created by Vladislav Penchev on 2020/10/01
 */
@Configuration
@EnableWebMvc
public class WebMvcConfigurerConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedOrigins("*")
                .allowedHeaders("*")
                .exposedHeaders("Location", "Access-Control-Allow-Origin");
    }
}
