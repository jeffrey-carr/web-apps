package dev.jeffreycarr.javacommon.models;

public class VariableNotDefinedException extends Exception {
  private String variable;

  public VariableNotDefinedException(String variable) {
    super("Environment variable not defined");

    this.variable = variable;
  }
  
  public String getMissingVariable() {
    return this.variable;
  }
}
