/* (C)2025 */
package dev.jeffreycarr.webgamesbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"dev.jeffreycarr.webgamesbackend", "dev.jeffreycarr.javacommon"})
public class GamesApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamesApplication.class, args);
    }
}
