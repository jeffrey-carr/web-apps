package dev.jeffreycarr.federation.models;

public class APIKeyExists extends Exception {
  public APIKeyExists(String app) {
    super(String.format("An active API key already exists for %s", app));
  }
}
