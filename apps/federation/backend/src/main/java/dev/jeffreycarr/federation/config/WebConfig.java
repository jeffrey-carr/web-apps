/* (C)2025 */
package dev.jeffreycarr.federation.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        // Protected routes
        registry.addMapping("/api/auth/login")
            .allowedOrigins("https://login.jeffreycarr.dev", "http://login.jeffreycarr.local:5175")
            .allowedMethods("POST")
            .allowedHeaders("*")
            .allowCredentials(true);

        registry.addMapping("/api/**")
            .allowedOriginPatterns(
                "https://*.jeffreycarr.dev",
                "http://*.jeffreycarr.local:*"
            )
            .allowedMethods("GET", "POST")
            .allowedHeaders("Content-Type: application/json")
            .allowCredentials(true);
    }
}
