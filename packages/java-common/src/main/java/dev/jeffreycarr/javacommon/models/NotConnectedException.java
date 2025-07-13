package dev.jeffreycarr.javacommon.models;

public class NotConnectedException extends Exception {
  public NotConnectedException() {
    super("Not connected to database");
  }
}
