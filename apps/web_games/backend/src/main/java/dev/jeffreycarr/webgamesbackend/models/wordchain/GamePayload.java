package dev.jeffreycarr.webgamesbackend.models.wordchain;

public class GamePayload {
  public String uuid;
  public String[] chain;
  public int userProgress;
  public String encryptedState;

  public GamePayload(
    String uuid,
    String[] chain,
    int userProgress,
    String encryptedState
  ) {
    this.uuid = uuid;
    this.chain = chain;
    this.userProgress = userProgress;
    this.encryptedState = encryptedState;
  }
}
