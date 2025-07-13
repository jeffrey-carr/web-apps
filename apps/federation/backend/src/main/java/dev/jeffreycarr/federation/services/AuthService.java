package dev.jeffreycarr.federation.services;

import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mongodb.ErrorCategory;
import com.mongodb.MongoWriteException;
import com.mongodb.client.result.InsertOneResult;

import dev.jeffreycarr.federation.constants.MongoConstants;
import dev.jeffreycarr.federation.models.CreateUserRequest;
import dev.jeffreycarr.federation.models.EmailInUseException;
import dev.jeffreycarr.federation.models.User;
import dev.jeffreycarr.javacommon.models.NotConnectedException;
import dev.jeffreycarr.javacommon.models.NotFoundException;
import dev.jeffreycarr.javacommon.services.MongoService;
import dev.jeffreycarr.javacommon.utils.StringUtils;

@Component
public class AuthService extends Exception {
  private MongoService<User> mongo;
  private Random random;
  private Base64.Encoder b64Encoder;

  @Autowired
  public AuthService(MongoService<User> mongo) {
    this.mongo = mongo;
    this.mongo.useCollection(MongoConstants.USER_DB, MongoConstants.USERS_COLL, User.class);
    
    this.random = new Random();
    this.b64Encoder = Base64.getEncoder();
  }
  
  public User getUserByEmail(String email) throws NotConnectedException, NotFoundException {
    List<User> users = this.mongo.getByKey("email", email);
    return users.get(0);
  }
  
  public User createUser(CreateUserRequest request) throws EmailInUseException, NotConnectedException, Exception {
    String uuid = StringUtils.newUUID();
    byte[] salt = this.generateSalt();
    String hashPassword = this.hashPassword(salt, request.password);
    User user = new User(
      uuid,
      request.email,
      hashPassword,
      salt,
      request.fName,
      request.lName,
      request.character
    );
    
    // Log the user in immediately
    user.createToken();

    InsertOneResult result;
    try {
      result = this.mongo.insertItem(user);
    } catch (MongoWriteException e) {
      if (e.getError().getCategory() == ErrorCategory.DUPLICATE_KEY) {
        throw new EmailInUseException(user.getEmail());
      }
      
      throw new Exception("Error creating user");
    }

    if (result.getInsertedId() == null) {
      throw new Exception("Error creating user");
    }
    
    return user;
  }
  
  public Optional<User> authUser(String email, String password) throws NotConnectedException, NotFoundException {
    User user = this.getUserByEmail(email);
    
    String passwordGuessHash = this.hashPassword(user.getSalt(), password);
    if (!user.getHashedPassword().equals(passwordGuessHash)) {
      return Optional.empty();
    }

    // Update the user's auth token and save it to the DB
    user.createToken();
    this.mongo.updateItem(user.getUUID(), user);

    return Optional.of(user);
  }

  public Optional<User> validateToken(String uuid, String token) throws NotConnectedException, NotFoundException {
    User user = this.mongo.getByUUID(uuid);
    if (!user.isTokenValid()) {
      return Optional.empty();
    }

    return Optional.of(user);
  }
  
  private byte[] generateSalt() {
    byte[] salt = new byte[16];
    random.nextBytes(salt);
    return salt;
  }

  private String hashPassword(byte[] salt, String plaintext) {
    KeySpec spec = new PBEKeySpec(plaintext.toCharArray(), salt, 65536, 128);
    byte[] hash;
    try {
      SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
      hash = factory.generateSecret(spec).getEncoded();
    } catch (Exception e) {
      System.exit(1);
      return "";
    }
    
    return this.b64Encoder.encodeToString(hash);
  }
}
