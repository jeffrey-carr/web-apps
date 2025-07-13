package dev.jeffreycarr.webgamesbackend.models;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class CommonStats {
  @BsonProperty("gameName")
  public String gameName;
  @BsonProperty("gamesPlayed")
  private int gamesPlayed;
  @BsonProperty("gamesCompleted")
  private int gamesCompleted;
  
  public CommonStats(String gameName) {
    this.gameName = gameName;
    this.gamesPlayed = 0;
    this.gamesCompleted = 0;
  }
  
  public CommonStats(String gameName, int gamesPlayed, int gamesCompleted) {
    this.gameName = gameName;
    this.gamesPlayed = gamesPlayed;
    this.gamesCompleted = gamesCompleted;
  }
  
  public void incrementGamesPlayed() {
    this.gamesPlayed++;
  }
  
  public void incrementGamesCompleted() {
    this.gamesCompleted++;
  }
  
  public void setGameName(String newGameName) {
    this.gameName = newGameName;
  }
  public String getGameName() {
    return this.gameName;
  }
  public void setGamesPlayed(int played) {
    this.gamesPlayed = played;
  }
  public int getGamesPlayed() {
    return this.gamesPlayed;
  }
  public void setGamesCompleted(int completed) {
    this.gamesCompleted = completed;
  }
  public int getGamesCompleted() {
    return this.gamesCompleted;
  }
}
