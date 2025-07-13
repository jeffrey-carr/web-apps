package dev.jeffreycarr.javacommon.services;

import org.springframework.stereotype.Component;

import dev.jeffreycarr.javacommon.models.VariableNotDefinedException;
import io.github.cdimascio.dotenv.Dotenv;

@Component
public class EnvironmentService {
  private Dotenv env;

  public EnvironmentService() {
    this.env = Dotenv.load();
  }
  
  public String get(String key) throws VariableNotDefinedException {
    String value = env.get(key);
    if (value == null) {
      throw new VariableNotDefinedException(key);
    }
    
    return value;
  }
}
