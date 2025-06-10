package dev.jeffreycarr.javacommon.utils;

import java.util.UUID;

public class StringUtils {
  public static String newUUID() {
    UUID uuid = UUID.randomUUID();
    return uuid.toString();
  }

  public static String ping() {
    return "pong";
  }
}
