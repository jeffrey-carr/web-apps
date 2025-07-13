package dev.jeffreycarr.federation.models;

public class EmailInUseException extends Exception {
  public EmailInUseException(String email) {
    super(String.format("Email %s is already taken", email));
  }
}
