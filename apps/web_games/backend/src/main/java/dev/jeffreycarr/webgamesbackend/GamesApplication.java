/* (C)2025 */
package dev.jeffreycarr.webgamesbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration(exclude={MongoAutoConfiguration.class})
@ComponentScan(basePackages = {"dev.jeffreycarr.webgamesbackend", "dev.jeffreycarr.javacommon"})
public class GamesApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamesApplication.class, args);
    }
}
