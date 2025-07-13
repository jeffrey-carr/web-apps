package dev.jeffreycarr.webgamesbackend.models;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;

import dev.jeffreycarr.webgamesbackend.models.binoku.BinokuStats;
import dev.jeffreycarr.webgamesbackend.models.wordchain.WordChainStats;

public class UserStats {
  @BsonId
  private String userUUID;
  @BsonProperty("binoku")
  private BinokuStats binoku;
  @BsonProperty("wordChain")
  private WordChainStats wordChain;
  
  public UserStats() {}

  public UserStats(String userUUID) {
    this.userUUID = userUUID;
    this.binoku = new BinokuStats();
    this.wordChain = new WordChainStats();
  }

  public UserStats(String userUUID, BinokuStats binoku, WordChainStats wordChain) {
    this.userUUID = userUUID;
    this.binoku = binoku;
    this.wordChain = wordChain;
  }
  
  public int totalGamesPlayed() {
    return this.binoku.getGamesCompleted() + this.wordChain.getGamesPlayed();
  }

  @BsonId
  public void setUserUUID(String newUUID) {
    this.userUUID = newUUID;
  }
  @BsonId
  public String getUserUUID() {
    return this.userUUID;
  }
  public void setBinoku(BinokuStats newStats) {
    this.binoku = newStats;
  }
  public BinokuStats getBinoku() {
    return this.binoku;
  }
  public void setWordChain(WordChainStats newStats) {
    this.wordChain = newStats;
  }
  public WordChainStats getWordChain() {
    return this.wordChain;
  }
}
