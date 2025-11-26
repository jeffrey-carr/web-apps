package dev.jeffreycarr.javacommon.utils;

import java.util.Optional;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import dev.jeffreycarr.javacommon.constants.AuthConstants;
import dev.jeffreycarr.javacommon.constants.EnvironmentConstants;
import dev.jeffreycarr.javacommon.models.CommonUser;

public class AuthUtils {
  private static String DevAuthEndpoint = "http://login.jeffreycarr.local:9999/api/auth";
  private static String ProdAuthEndpoint = "https://login.jeffreycarr.dev/api/auth";

  private AuthUtils() {}
  
  public static Optional<CommonUser> getUser(String environment, String authCookie) {
    if (authCookie.isEmpty()) {
      return Optional.empty();
    }

    HttpHeaders headers = new HttpHeaders();
    headers.set("Cookie", String.format("%s=%s", AuthConstants.AuthorizationCookieName, authCookie));
    HttpEntity<Void> entity = new HttpEntity<>(headers);

    String endpoint;
    if (environment.equals(EnvironmentConstants.ProdEnvironment)) {
      endpoint = ProdAuthEndpoint;
    } else {
      endpoint = DevAuthEndpoint;
    }
    endpoint = String.format("%s/authed-user", endpoint);

    ResponseEntity<CommonUser> response = new RestTemplate().exchange(
      endpoint,
      HttpMethod.GET,
      entity,
      CommonUser.class
    );
    if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
      return Optional.empty();
    }
    
    return Optional.of(response.getBody());
  }
}
