package dev.jeffreycarr.javacommon.utils;

import java.util.HashMap;
import java.util.Map;

public class ServerResponse {
  public static Map<String, String> newMessage(String message) {
    Map<String, String> m  = new HashMap<String, String>();
    m.put("message", message);
    return m;
  }
}
