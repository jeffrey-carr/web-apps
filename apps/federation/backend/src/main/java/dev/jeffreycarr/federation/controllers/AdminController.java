package dev.jeffreycarr.federation.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.jeffreycarr.federation.models.APIKey;
import dev.jeffreycarr.federation.models.APIKeyExists;
import dev.jeffreycarr.federation.models.RevokeRequest;
import dev.jeffreycarr.federation.models.TokenCreateRequest;
import dev.jeffreycarr.federation.models.User;
import dev.jeffreycarr.federation.services.AdminService;
import dev.jeffreycarr.federation.services.AuthService;
import dev.jeffreycarr.javacommon.constants.AuthConstants;
import dev.jeffreycarr.javacommon.models.NotConnectedException;
import dev.jeffreycarr.javacommon.models.NotFoundException;
import dev.jeffreycarr.javacommon.utils.ServerResponse;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
  private AdminService adminService;
  private AuthService authService;

  @Autowired
  public AdminController(AdminService adminService, AuthService authService) {
    this.adminService = adminService;
    this.authService = authService;
  }

  @GetMapping("/keys")
  public ResponseEntity<?> getAllKeys(@CookieValue(name = AuthConstants.AuthorizationCookieName) String authToken) {
    Optional<User> potentialAdmin;
    try {
      potentialAdmin = this.getAdminUser(authToken);
    } catch (NotConnectedException e) {
      return this.dbConnectionError();
    } catch (NotFoundException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ServerResponse.newMessage("Invalid token"));
    }

    if (potentialAdmin.isEmpty()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ServerResponse.newMessage("Invalid token"));
    }

    List<APIKey> keys;
    try {
      keys = this.adminService.getAllAPIKeys();
    } catch (NotConnectedException e) {
      return this.dbConnectionError();
    }

    System.out.printf("Got %d keys:\n", keys.size());
    for (APIKey key : keys) {
      System.out.printf("\t%s\n", key.getApp());
    }

    return ResponseEntity.ok(keys);
  }

  @PostMapping("/keys")
  public ResponseEntity<?> newKey(
    @CookieValue(name = AuthConstants.AuthorizationCookieName) String authToken,
    @RequestBody TokenCreateRequest request
  ) {
    Optional<User> potentialAdmin;
    try {
      potentialAdmin = this.getAdminUser(authToken);
    } catch (NotConnectedException e) {
      return this.dbConnectionError();
    } catch (NotFoundException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ServerResponse.newMessage("Invalid token"));
    }

    if (potentialAdmin.isEmpty()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ServerResponse.newMessage("Invalid token"));
    }

    if (request.app == null) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage("App is required"));
    }

    APIKey createdKey;
    try {
      createdKey = this.adminService.createAPIKey(request.app);
    } catch (NotConnectedException e) {
      return this.dbConnectionError();
    } catch (APIKeyExists e) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage("An API key already exists for that app"));
    }

    return ResponseEntity.ok(createdKey);
  }

  @PostMapping("/keys/revoke")
  private ResponseEntity<?> revokeKey(
    @CookieValue(name = AuthConstants.AuthorizationCookieName) String authToken,
    @RequestBody RevokeRequest request
  ) {
    Optional<User> potentialAdmin;
    try {
      potentialAdmin = this.getAdminUser(authToken);
    } catch (NotConnectedException e) {
      return this.dbConnectionError();
    } catch (NotFoundException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ServerResponse.newMessage("Invalid token"));
    }

    if (potentialAdmin.isEmpty()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ServerResponse.newMessage("Invalid token"));
    }

    if (request.key == null) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage("Bad request"));
    }

    APIKey key;
    try {
      key = this.adminService.revokeAPIKey(request.key);
    } catch (NotConnectedException e) {
      return this.dbConnectionError();
    } catch (NotFoundException e) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage("Invalid token"));
    }

    return ResponseEntity.ok(key);
  }

  private Optional<User> getAdminUser(String token) throws NotConnectedException, NotFoundException {
    Optional<User> potentialUser = this.authService.validateToken(token);
    if (potentialUser.isEmpty()) {
      return potentialUser;
    }

    if (!potentialUser.get().getIsAdmin()) {
      return Optional.empty();
    }

    return potentialUser;
  }

  private ResponseEntity<?> dbConnectionError() {
    return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error connecting to database"));
  }
}