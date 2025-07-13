package dev.jeffreycarr.federation.models;

public class AuthRequest {
  public final String email;
  public final String password;
  
  public AuthRequest(String email, String hashedPassword) {
    this.email = email;
    this.password = hashedPassword;
  }
}
