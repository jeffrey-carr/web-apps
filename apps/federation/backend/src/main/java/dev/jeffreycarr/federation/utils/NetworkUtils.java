package dev.jeffreycarr.federation.utils;

import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie.ResponseCookieBuilder;

import dev.jeffreycarr.federation.models.CookieOptions;
import dev.jeffreycarr.javacommon.constants.EnvironmentConstants;
import dev.jeffreycarr.javacommon.models.VariableNotDefinedException;

public class NetworkUtils {
  public static ResponseEntity<String> incorrectLogin() {
    return ResponseEntity.badRequest().body("Email or password is incorrect");
  }
  
  public static ResponseCookie createCookie(String key, String authToken, CookieOptions opts) throws Exception, VariableNotDefinedException {
    ResponseCookieBuilder builder = ResponseCookie.from(key, authToken);
    builder.domain(".jeffreycarr.dev");
    builder.path(opts.getPath());
    builder.secure(true);
    builder.httpOnly(opts.getHttpOnly());
    builder.maxAge(opts.getMaxAge());
    builder.sameSite("None");
    
    String environment = GeneralUtils.getEnvironment();
    if (!environment.equals(EnvironmentConstants.ProdEnvironment)) {
      System.out.printf("environment is %s\n", environment);
      builder.domain(".jeffreycarr.local");
      builder.secure(false);
      builder.sameSite("Lax");
    }
    
    return builder.build();
  }
}
