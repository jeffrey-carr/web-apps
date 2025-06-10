package dev.jeffreycarr.javacommon.services;

public class EncryptionError extends Exception {
  public EncryptionError(String message) {
    super(message);
  }
  
  public EncryptionError(String message, Throwable cause) {
    super(message, cause);
  }
  
  public EncryptionError() {
    this("Error in encryption");
  }
}
