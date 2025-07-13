package dev.jeffreycarr.webgamesbackend.utils;

import java.util.Optional;

import dev.jeffreycarr.javacommon.models.CommonUser;
import dev.jeffreycarr.javacommon.utils.AuthUtils;

public class HandlerUtils {
  private HandlerUtils() {}
  
  public static CommonUser getUserFromCookie(String environment, String authCookie) {
    Optional<CommonUser> maybeUser = AuthUtils.getUser(environment, authCookie);
    if (!maybeUser.isPresent()) {
      return null;
    }

    return maybeUser.get();
  }
}
