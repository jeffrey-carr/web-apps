package dev.jeffreycarr.federation.models;

import java.time.Instant;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;

public class APIKey {
  @BsonId
  private String key;
  @BsonProperty("app")
  private String app;
  @BsonProperty("active")
  private boolean active;
  @BsonProperty("grantedAt")
  private Instant grantedAt;
  @BsonProperty("revokedAt")
  private Instant revokedAt;
  @BsonProperty("lastSeenAt")
  private Instant lastSeenAt;

  public APIKey() {}

  public APIKey(String key, String app) {
    this.key = key;
    this.app = app;
    this.active = true;
    this.grantedAt = Instant.now();
    this.lastSeenAt = Instant.now();
  }

  public APIKey(
    String key, 
    String app,
    boolean active,
    Instant grantedAt,
    Instant revokedAt,
    Instant lastSeenAt
  ) {
    this.key = key;
    this.app = app;
    this.active = active;
    this.grantedAt = grantedAt;
    this.revokedAt = revokedAt;
    this.lastSeenAt = lastSeenAt;
  }

  public void revoke() {
    this.active = false;
    this.revokedAt = Instant.now();
  }

  public void seen() {
    this.lastSeenAt = Instant.now();
  }

  public boolean isActive() { return this.active; }

  @BsonId
  public String getKey() { return key; }
  public String getApp() { return app; }
  public boolean getActive() { return active; }
  public Instant getGrantedAt() { return grantedAt; }
  public Instant getRevokedAt() { return revokedAt; }
  public Instant getLastSeenAt() { return lastSeenAt; }

  public void setKey(String key) { this.key = key; }
  public void setApp(String app) { this.app = app; }
  public void setActive(boolean active) { this.active = active; }
  public void setGrantedAt(Instant grantedAt) { this.grantedAt = grantedAt; }
  public void setRevokedAt(Instant revokedAt) { this.revokedAt = revokedAt; }
  public void setLastSeenAt(Instant lastSeenAt) { this.lastSeenAt = lastSeenAt; }
}
