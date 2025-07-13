package dev.jeffreycarr.webgamesbackend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.jeffreycarr.javacommon.constants.AuthConstants;
import dev.jeffreycarr.javacommon.constants.EnvironmentConstants;
import dev.jeffreycarr.javacommon.models.CommonUser;
import dev.jeffreycarr.javacommon.models.NotConnectedException;
import dev.jeffreycarr.javacommon.models.VariableNotDefinedException;
import dev.jeffreycarr.javacommon.services.EnvironmentService;
import dev.jeffreycarr.javacommon.utils.AuthUtils;
import dev.jeffreycarr.javacommon.utils.ServerResponse;
import dev.jeffreycarr.webgamesbackend.models.GetUserResponse;
import dev.jeffreycarr.webgamesbackend.models.UserStats;
import dev.jeffreycarr.webgamesbackend.services.UserStatsService;

@RestController
@RequestMapping("/api/user")
public class UserController {
  private UserStatsService stats;
  private String env;
  
  @Autowired
  public UserController(UserStatsService statsService, EnvironmentService environment) {
    this.stats = statsService;
    
    try {
      this.env = environment.get(EnvironmentConstants.Environment);
    } catch (VariableNotDefinedException e) {
      this.env = EnvironmentConstants.DevEnvironment;
    }
  }
  
  @GetMapping("/me")
  public ResponseEntity<?> getUser(@CookieValue(name = AuthConstants.AuthorizationCookieName) String authValue) {
    Optional<CommonUser> maybeUser = AuthUtils.getUser(this.env, authValue);
    if (!maybeUser.isPresent()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ServerResponse.newMessage("not authorized"));
    }
    
    CommonUser user = maybeUser.get();
    UserStats userStats;
    try {
      userStats = this.stats.getOrCreateUserStats(user.uuid);
    } catch (NotConnectedException e) {
      return ResponseEntity.internalServerError().body(ServerResponse.newMessage("could not reach database"));
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(ServerResponse.newMessage("unknown error"));
    }
    
    return ResponseEntity.ok().body(new GetUserResponse(user, userStats));
  }
}
