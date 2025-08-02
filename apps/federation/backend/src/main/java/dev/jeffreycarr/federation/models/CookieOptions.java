package dev.jeffreycarr.federation.models;

public class CookieOptions {
  private int maxAge = 7 * 24 * 60 * 60;
  private String path = "/";
  private boolean httpOnly = true;
  
  public CookieOptions() {}
  public CookieOptions(int maxAge, String path, boolean httpOnly) {
    this.maxAge = maxAge;
    this.path = path;
    this.httpOnly = httpOnly;
  }
  
  public int getMaxAge() {
    return this.maxAge;
  }
  public void setMaxAge(int maxAge) {
    this.maxAge = maxAge;
  }
  
  public String getPath() {
    return this.path;
  }
  public void setPath(String path) {
    this.path = path;
  }
  
  public boolean getHttpOnly() {
    return this.httpOnly;
  }
  public void setHttpOnly(boolean httpOnly) {
    this.httpOnly = httpOnly;
  }
}