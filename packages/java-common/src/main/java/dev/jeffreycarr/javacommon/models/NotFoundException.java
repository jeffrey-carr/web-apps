package dev.jeffreycarr.javacommon.models;

public class NotFoundException extends Exception {
  public NotFoundException() {
    super("Entry was not found");
  }
  
  public NotFoundException(String message) {
    super(message);
  }
}
