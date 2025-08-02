package dev.jeffreycarr.federation.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie.ResponseCookieBuilder;

import dev.jeffreycarr.federation.constants.AuthConstants;
import dev.jeffreycarr.federation.models.CookieOptions;
import dev.jeffreycarr.javacommon.constants.EnvironmentConstants;
import dev.jeffreycarr.javacommon.models.VariableNotDefinedException;

public class NetworkUtils {
  public static ResponseEntity<String> incorrectLogin() {
    return ResponseEntity.badRequest().body("Email or password is incorrect");
  }
  
  public static ResponseCookie createCookie(String key, String[] values, CookieOptions opts) throws Exception, VariableNotDefinedException {
    if (values.length == 0) {
      throw new Exception("No values provided!");
    }

    String valueStr = String.join(":", values);
    ResponseCookieBuilder builder = ResponseCookie.from(key, valueStr);
    builder.domain(".jeffreycarr.dev");
    builder.path(opts.getPath());
    builder.secure(true);
    builder.httpOnly(opts.getHttpOnly());
    builder.maxAge(opts.getMaxAge());
    builder.sameSite("None");
    
    String environment = GeneralUtils.getEnvironment();
    if (!environment.equals(EnvironmentConstants.ProdEnvironment)) {
      builder.domain(".jeffreycarr.local");
      builder.secure(false);
      builder.sameSite("Lax");
    }
    
    return builder.build();
  }
  
  public static String[] getCookieValues(String valueStr) {
    return valueStr.split(":");
  }
  
  public static String getVerificationURL() {
    String environment = GeneralUtils.getEnvironment();
    if (environment.equals(EnvironmentConstants.ProdEnvironment)) {
      return "https://login.jeffreycarr.dev/verify";
    }

    return "http://login.jeffreycarr.local:5173/verify";
  }
  
  public static Map<String, String> parseAuthCookie(String valueStr) {
    Map<String, String> tokens = new HashMap<>();

    String[] appsAndTokens = valueStr.split(AuthConstants.CookieAppDelimiter);
    for (String appAndToken : appsAndTokens) {
      String[] values = appAndToken.split(AuthConstants.CookieTokenDelimiter);
      // Should be app,token
      if (values.length != 2) {
        continue;
      }
      
      tokens.put(values[0], values[1]);
    }
    
    return tokens;
  }
}