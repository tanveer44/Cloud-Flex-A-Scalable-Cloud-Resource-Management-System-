package com.example.springbootreactintegration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan; // Updated import
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.ssl.SslAutoConfiguration; // Correct import for excluding SSL configuration


@SpringBootApplication(exclude = {SslAutoConfiguration.class}) // Only one @SpringBootApplication annotation needed
@EntityScan("com.example.springbootreactintegration.model") // Specify the package where your entities are located
@EnableJpaRepositories("com.example.springbootreactintegration.repository") // Specify the package for your repositories
public class SpringBootReactIntegrationApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootReactIntegrationApplication.class, args);
    }
}
