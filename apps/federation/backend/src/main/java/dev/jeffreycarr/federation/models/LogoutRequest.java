package dev.jeffreycarr.federation.models;

public class LogoutRequest {
 public final boolean logoutEverywhere; 
  
 public LogoutRequest(boolean logoutEverywhere) {
  this.logoutEverywhere = logoutEverywhere;
 }
}
