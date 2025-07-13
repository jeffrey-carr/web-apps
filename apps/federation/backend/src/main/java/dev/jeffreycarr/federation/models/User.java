package dev.jeffreycarr.federation.models;

import java.time.Duration;
import java.time.Instant;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;

import dev.jeffreycarr.javacommon.models.CommonUser;
import dev.jeffreycarr.javacommon.utils.StringUtils;

public class User {
  private static Duration tokenValidDuration = Duration.ofDays(30);

  @BsonId
  private String uuid;
  @BsonProperty("email")
  private String email;
  @BsonProperty("hashedPassword")
  private String hashedPassword;
  @BsonProperty("salt")
  private byte[] salt;
  @BsonProperty("fName")
  private String fName;
  @BsonProperty("lName")
  private String lName;
  @BsonProperty("token")
  private String token;
  @BsonProperty("character")
  private String character;
  @BsonProperty("tokenValidTo")
  private Instant tokenValidTo;
  
  public User() {}
  
  public User(
    String uuid,
    String email,
    String hashedPassword,
    byte[] salt,
    String fName,
    String lName,
    String character
  ) {
    this.uuid = uuid;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.salt = salt;
    this.fName = fName;
    this.lName = lName;
    this.character = character;
  }
  
  public boolean isTokenValid() {
    Instant now = Instant.now();
    return now.isBefore(this.tokenValidTo);
  }
  
  public void refreshToken() {
    this.tokenValidTo = Instant.now().plus(User.tokenValidDuration);
  }
  
  public CommonUser toCommonUser() {
    return new CommonUser(this.uuid, this.email, this.fName, this.lName, this.character);
  }
  
  public String createToken() {
    this.token = StringUtils.newUUID();
    this.tokenValidTo = Instant.now().plus(User.tokenValidDuration);
    return this.token;
  }

  @BsonId
  public void setUUID(String newUUID) {
    this.uuid = newUUID;
  }
  @BsonId
  public String getUUID() {
    return this.uuid;
  }
  public void setEmail(String newEmail) {
    this.email = newEmail;
  }
  public String getEmail() {
    return this.email;
  }
  public void setHashedPassword(String newPassword)  {
    this.hashedPassword = newPassword;
  }
  public String getHashedPassword() {
    return this.hashedPassword;
  }
  public void setSalt(byte[] newSalt) {
    this.salt = newSalt;
  }
  public byte[] getSalt() {
    return this.salt;
  }
  public void setFirstName(String newFName) {
    this.fName = newFName;
  }
  public String getFirstName() {
    return this.fName;
  }
  public void setLastName(String newLName) {
    this.lName = newLName;
  }
  public String getLastName() {
    return this.lName;
  }
  public void setCharacter(String newCharacter) {
    this.character = newCharacter;
  }
  public String getCharacter() {
    return this.character;
  }
  public void setToken(String newToken) {
    this.token = newToken;
  }
  public String getToken() {
    return this.token;
  }
  public void setTokenValidTo(Instant newTokenValidTo) {
    this.tokenValidTo = newTokenValidTo;
  }
  public Instant getTokenValidTo() {
    return this.tokenValidTo;    
  }
}
