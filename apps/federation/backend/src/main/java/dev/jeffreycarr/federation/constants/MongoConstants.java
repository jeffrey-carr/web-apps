package dev.jeffreycarr.federation.constants;

public final class MongoConstants {
  private MongoConstants() {}
  
  public static final String FEDERATION_DB = "federation";
  public static final String USERS_COLL = "users";
  public static final String API_KEY_COLL = "api_keys";

  public static final String AUTH_TOKEN_KEY = "token";
}
