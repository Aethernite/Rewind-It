package com.mentormate.hackathon.configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * {@link OpenApiConfiguration} contains all configuration that needed about OpenAPI 3
 * <p>
 * Created by Vladislav Penchev on 2020/09/30
 */
@Configuration
public class OpenApiConfiguration {
    /**
     * Allows definitions to be appeared globally
     */
    @Bean
    public OpenAPI customOpenAPI() {
        Contact contact = new Contact().name("Timesheet API");

        return new OpenAPI().components(new Components()).info(
                new Info().title("Timesheet API")
                        .description("This is a sample Spring Boot RESTful service using springdoc-openapi and OpenAPI 3.")
                        .version("1.0.0")
                        .contact(contact));
    }
}
