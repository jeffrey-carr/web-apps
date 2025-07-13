package dev.jeffreycarr.federation.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.jeffreycarr.federation.models.AuthRequest;
import dev.jeffreycarr.federation.models.CreateUserRequest;
import dev.jeffreycarr.federation.models.User;
import dev.jeffreycarr.federation.services.AuthService;
import dev.jeffreycarr.federation.utils.NetworkUtils;
import dev.jeffreycarr.federation.validators.AuthValidators;
import dev.jeffreycarr.javacommon.constants.AuthConstants;
import dev.jeffreycarr.javacommon.models.NotConnectedException;
import dev.jeffreycarr.javacommon.models.NotFoundException;
import dev.jeffreycarr.javacommon.utils.ServerResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private AuthService service;
  
  @Autowired
  public AuthController(AuthService service) {
    this.service = service;
  }
  
  @PostMapping("/login")
  public ResponseEntity<?> authUser(@RequestBody AuthRequest request) {
    String validationErr = AuthValidators.validateAuthRequest(request);
    if (validationErr.length() != 0) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage(validationErr));
    }
    
    Optional<User> possibleUser;
    try {
      possibleUser = this.service.authUser(request.email, request.password);
    } catch (NotConnectedException e) {
      return ResponseEntity.internalServerError().body("Error connecting to database");
    } catch (NotFoundException e) {
      return NetworkUtils.incorrectLogin();
    }
    
    if (!possibleUser.isPresent()) {
      return NetworkUtils.incorrectLogin();
    }
    
    User user = possibleUser.get();
    BodyBuilder response = ResponseEntity.ok();
    try {
      response = this.addAuthCookieToResponse(response, user);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error creating cookie"));
    }
    
    return response.body(user.toCommonUser());
  }
  
  @PostMapping("/create")
  public ResponseEntity<?> createUser(
    @RequestBody CreateUserRequest request) {
    String validationError = AuthValidators.validateCreateRequest(request);
    if (!validationError.equals("")) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage(validationError));
    }
    
    User createdUser;
    try {
      createdUser = this.service.createUser(request);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error creating user"));
    }
    
    BodyBuilder response = ResponseEntity.ok();
    try {
      response = this.addAuthCookieToResponse(response, createdUser);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error creating cookie"));
    }
    
    return response.body(createdUser.toCommonUser());
  }
  
  @GetMapping("/authed-user")
  public ResponseEntity<?> validateCookie(
    @CookieValue(name = AuthConstants.AuthorizationCookieName) String cookieValue
  ) {
    String[] cookieValues = NetworkUtils.getCookieValues(cookieValue);
    if (cookieValues.length != 2) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage("Invalid cookie"));
    }
    String uuid = cookieValues[0];
    String token = cookieValues[1];

    Optional<User> potentialUser;
    try {
      potentialUser = this.service.validateToken(uuid, token);
    } catch (NotConnectedException e) {
      return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error connecting to DB"));
    } catch (NotFoundException e) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage("Invalid token"));
    }
    
    if (!potentialUser.isPresent()) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage("Invalid token"));
    }
    
    User user = potentialUser.get();
    return ResponseEntity.ok().body(user.toCommonUser());
  }
  
  @PostMapping("/logout")
  public ResponseEntity<?> logout(@CookieValue(name = AuthConstants.AuthorizationCookieName) String cookieValue) {
    // Do not invalidate login token so they stay logged in per site
    return ResponseEntity.ok().build();
  }
  
  private BodyBuilder addAuthCookieToResponse(BodyBuilder response, User user) throws Exception {
    String[] cookieValues = new String[]{user.getUUID(), user.getToken()};
    ResponseCookie authCookie = NetworkUtils.createCookie(AuthConstants.AuthorizationCookieName, cookieValues);
    return response.header("Set-Cookie", authCookie.toString());
  }
}
