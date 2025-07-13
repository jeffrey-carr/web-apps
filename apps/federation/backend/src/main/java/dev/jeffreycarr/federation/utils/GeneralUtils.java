package dev.jeffreycarr.federation.utils;

import dev.jeffreycarr.javacommon.constants.EnvironmentConstants;
import dev.jeffreycarr.javacommon.models.VariableNotDefinedException;
import dev.jeffreycarr.javacommon.services.EnvironmentService;

public class GeneralUtils {
  private GeneralUtils() {}
  
  public static String getEnvironment() {
    EnvironmentService env = new EnvironmentService();
    String environment;
    try {
    environment = env.get(EnvironmentConstants.Environment);
    } catch (VariableNotDefinedException e) {
      return "";
    }
    
    return environment;
  }
}
