package dev.jeffreycarr.federation.validators;

import java.util.Arrays;
import java.util.List;

import dev.jeffreycarr.federation.models.AuthRequest;
import dev.jeffreycarr.federation.models.CreateUserRequest;

public class AuthValidators {
  private AuthValidators() {}
  
  public static String validateEmail(String email) {
    email = email.trim();
    if (email.length() == 0) {
      return "Email is required";
    }
    
    // TODO - email regex
    //
    return "";
  }

  public static String validatePassword(String password) {
    password = password.trim();
    if (password.length() < 12) {
      return "Password must be at least 12 characters";
    }

    return "";
  }
  
  private static String validateName(String name) {
    name = name.trim();
    if (name.length() == 0) {
      return "Name is required";
    }
    
    // TODO - name regex

    return "";
  }
  
    private static String validateCharacter(String character) {
    List<String> validCharacters = Arrays.asList(
      "???",
      "ctrlzilla",
      "wandaconda",
      "eyezac_screamalot",
      "waddle_combs",
      "glitchard_simmons",
      "alien_degeneres"
    );
    
    if (!validCharacters.contains(character)) {
      return "Not a valid character";
    }
    
    return "";
  }

  public static String validateAuthRequest(AuthRequest request) {
    String email = request.email.trim();
    if (email.length() == 0) {
      return "Email is required";
    }
    
    String password = request.password.trim();
    String passwordErr = validatePassword(password);
    if (passwordErr.length() == 0) {
      return passwordErr;
    }
    
    return "";
  }

  public static String validateCreateRequest(CreateUserRequest request) {
    if (request.email == null || request.password == null || request.fName == null || request.lName == null) {
      return "Invalid request";
    }

    String errorMessage = validateEmail(request.email);
    if (errorMessage.length() != 0) {
      return errorMessage;
    }
    
    errorMessage = validatePassword(request.password);
    if (errorMessage.length() != 0) {
      return errorMessage;
    }
    
    errorMessage = validateName(request.fName);
    if (errorMessage.length() != 0) {
      return errorMessage;
    }
    
    errorMessage = validateName(request.fName);
    if (errorMessage.length() != 0) {
      return errorMessage;
    }
    
    errorMessage = validateCharacter(request.character);
    if (errorMessage.length() != 0) {
      return errorMessage;
    }
    
    return "";
  }
}
