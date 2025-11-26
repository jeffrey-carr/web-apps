package dev.jeffreycarr.javacommon.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CommonUser {
  public final String uuid;
  public final String email;
  public final String fName;
  public final String lName;
  public final boolean isAdmin;
  public final String character;
  
  public CommonUser(
    @JsonProperty("uuid") String uuid,
    @JsonProperty("email") String email,
    @JsonProperty("fName") String fName,
    @JsonProperty("lName") String lName,
    @JsonProperty("isAdmin") boolean isAdmin,
    @JsonProperty("character") String character
  ) {
    this.uuid = uuid;
    this.email = email;
    this.fName = fName;
    this.lName = lName;
    this.isAdmin = isAdmin;
    this.character = character;
  }
}
