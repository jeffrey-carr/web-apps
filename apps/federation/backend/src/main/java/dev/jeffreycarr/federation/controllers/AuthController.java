package dev.jeffreycarr.federation.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.jeffreycarr.federation.models.AuthRequest;
import dev.jeffreycarr.federation.models.BulkGetUsersRequest;
import dev.jeffreycarr.federation.models.CookieOptions;
import dev.jeffreycarr.federation.models.CreateUserRequest;
import dev.jeffreycarr.federation.models.LogoutRequest;
import dev.jeffreycarr.federation.models.MarcoRequest;
import dev.jeffreycarr.federation.models.User;
import dev.jeffreycarr.federation.services.APIService;
import dev.jeffreycarr.federation.services.AuthService;
import dev.jeffreycarr.federation.utils.NetworkUtils;
import dev.jeffreycarr.federation.validators.AuthValidators;
import dev.jeffreycarr.javacommon.constants.AuthConstants;
import dev.jeffreycarr.javacommon.constants.HeaderConstants;
import dev.jeffreycarr.javacommon.models.CommonUser;
import dev.jeffreycarr.javacommon.models.NotConnectedException;
import dev.jeffreycarr.javacommon.models.NotFoundException;
import dev.jeffreycarr.javacommon.utils.ServerResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private AuthService authService;
  private APIService apiService;
  
  @Autowired
  public AuthController(AuthService authService, APIService apiService) {
    this.authService = authService;
    this.apiService = apiService;
  }

  @GetMapping("/ping")
  public ResponseEntity<?> ping(@CookieValue(name = AuthConstants.AuthorizationCookieName, required = false) String token) {
    String msg = "pong";

    if (token != null) {
      ResponseEntity<?> maybeUser = this.validateCookie(token);
      if (maybeUser.getStatusCode() == HttpStatus.OK) {
        CommonUser user = (CommonUser) maybeUser.getBody();
        msg = String.format("%s (or should I say %s)", msg, user.fName);
      } else {
        msg = String.format("%s (auth failed)", msg);
      }
    }

    return ResponseEntity.ok(ServerResponse.newMessage(msg));
  }

  @PostMapping("/marco")
  public ResponseEntity<?> marco(@CookieValue(name = AuthConstants.AuthorizationCookieName, required = false) String token, @RequestBody MarcoRequest request) {
    String msg = "";
    if (token != null) {
      ResponseEntity<?> maybeUser = this.validateCookie(token);
      if (maybeUser.getStatusCode() == HttpStatus.OK) {
        CommonUser user = (CommonUser) maybeUser.getBody();
        msg = String.format("%s (or should I say %s)!", msg, user.fName);
      } else {
        msg = String.format("%s (auth failed)!", msg);
      }
    }

    if (!request.person.equalsIgnoreCase("marco")) {
      msg = String.format("%s Polo!", msg);
    } else {
      msg = String.format("%s Who were you looking for?", msg);
    }

    return ResponseEntity.ok(msg);
  }
  
  @PostMapping("/login")
  public ResponseEntity<?> authUser(@RequestBody AuthRequest request) {
    String validationErr = AuthValidators.validateAuthRequest(request);
    if (validationErr.length() != 0) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage(validationErr));
    }
    
    Optional<User> possibleUser;
    try {
      possibleUser = this.authService.authUser(request.email, request.password);
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
      response = this.addAuthCookieToResponse(response, user.getToken(), new CookieOptions());
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
      createdUser = this.authService.createUser(request);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error creating user"));
    }
    
    BodyBuilder response = ResponseEntity.ok();
    try {
      response = this.addAuthCookieToResponse(response, createdUser.getToken(), new CookieOptions());
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error creating cookie"));
    }
    
    return response.body(createdUser.toCommonUser());
  }
  
  @GetMapping("/authed-user")
  public ResponseEntity<?> validateCookie(
    @CookieValue(name = AuthConstants.AuthorizationCookieName) String authToken
  ) {
    Optional<User> potentialUser;
    try {
      potentialUser = this.authService.validateToken(authToken);
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

  // TODO - this shouldn't be accessible by any frontends, so it should be excluded (included?) from CORs
  @GetMapping("/user/{userUUID}")
  public ResponseEntity<?> getUser(
    @PathVariable String userUUID,
    @RequestHeader(HeaderConstants.APIKey) String apiKey
  ) {
    // Validate user UUID is present
    if (userUUID.length() == 0) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage("Bad request"));
    }

    boolean apiKeyIsValid;
    try {
      apiKeyIsValid = this.apiService.isKeyValid(apiKey);
    } catch (NotConnectedException e) {
      return this.connectionErr();
    }

    if (!apiKeyIsValid) {
      return this.unauthorizedErr();
    }

    User user;
    try {
      user = this.authService.getUserByUUID(userUUID);
    } catch (NotConnectedException e) {
      return this.connectionErr();
    } catch (NotFoundException e) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(user.toCommonUser());
  }

  @GetMapping("/users")
  public ResponseEntity<?> bulkGetUsers(
    @RequestHeader(HeaderConstants.APIKey) String apiKey,
    @RequestBody BulkGetUsersRequest request
  ) {
    if (request.userUUIDs.length == 0) {
      return ResponseEntity.badRequest().body(ServerResponse.newMessage("At least one user UUID is required"));
    }

    boolean apiKeyIsValid;
    try {
      apiKeyIsValid = this.apiService.isKeyValid(apiKey);
    } catch (NotConnectedException e) {
      return this.connectionErr();
    }
    if (!apiKeyIsValid) {
      return this.unauthorizedErr();
    }

    List<User> users;
    try {
      users = this.authService.getUsersByUUIDs(request.userUUIDs);
    } catch (NotConnectedException e) {
      return this.connectionErr();
    }

    Map<String, CommonUser> uuidToCommonUser = new HashMap<>();
    for (User user : users) {
      uuidToCommonUser.put(user.getUUID(), user.toCommonUser());
    }

    return ResponseEntity.ok(uuidToCommonUser);
  }
  
  @PostMapping("/logout")
  public ResponseEntity<?> logout(
    @CookieValue(name = AuthConstants.AuthorizationCookieName) String authToken,
    @RequestBody LogoutRequest request
  ) {
    if (request.logoutEverywhere) {
      try {
        this.authService.logoutEverywhere(authToken);
      } catch (NotConnectedException e) {
        return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error logging user out"));
      } catch (NotFoundException e) {
        return ResponseEntity.badRequest().body(ServerResponse.newMessage("Unknown user"));
      }
    }

    CookieOptions cookieOpts = new CookieOptions();
    cookieOpts.setMaxAge(0);
    
    BodyBuilder response = ResponseEntity.ok();
    try {
      response = this.addAuthCookieToResponse(response, authToken, cookieOpts);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error creating cookie"));
    }
    
    return response.build();
  }
  
  private BodyBuilder addAuthCookieToResponse(BodyBuilder response, String token, CookieOptions opts) throws Exception {
    ResponseCookie authCookie = NetworkUtils.createCookie(AuthConstants.AuthorizationCookieName, token, opts);
    return response.header("Set-Cookie", authCookie.toString());
  }

  private ResponseEntity<?> connectionErr() {
    return ResponseEntity.internalServerError().body(
      ServerResponse.newMessage("Error connecting to database")
    );
  }

  private ResponseEntity<?> unauthorizedErr() {
    return this.unauthorizedErr("This endpoint is for me and my apps only >:(");
  }
  private ResponseEntity<?> unauthorizedErr(String msg) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
      ServerResponse.newMessage(msg)
    );
  }
}

