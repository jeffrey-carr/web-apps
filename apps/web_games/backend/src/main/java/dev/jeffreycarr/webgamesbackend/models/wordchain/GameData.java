package dev.jeffreycarr.webgamesbackend.models.wordchain;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.jeffreycarr.javacommon.utils.StringUtils;

public class GameData {
  private String uuid;
  private String[] chain;
  private String[] revealedChain;
  private int userProgress;
  private String encryptedState;

  public GameData(String[] generatedChain) throws Exception {
    this.uuid = StringUtils.newUUID();
    this.chain = generatedChain;
    this.userProgress = 1;
    this.encryptedState = "";
    this.revealedChain = this.initializeRevealedWords(generatedChain);
  }

  public GameData(
    @JsonProperty("uuid")
    String uuid,
    @JsonProperty("chain")
    String[] chain,
    @JsonProperty("revealedChain")
    String[] revealedChain,
    @JsonProperty("userProgress")
    int userProgress,
    @JsonProperty("encryptedState")
    String encryptedState
  ) {
    this.uuid = uuid;
    this.chain = chain;
    this.revealedChain = revealedChain;
    this.userProgress = userProgress;
    this.encryptedState = encryptedState;
  }
  
  private String[] initializeRevealedWords(String[] allWords) throws Exception {
    if (allWords.length < 2) {
      throw new Exception("chain must have at least 2 words!");
    }

    String[] revealed = new String[allWords.length];
    revealed[0] = allWords[0];
    for (int i = 1; i < allWords.length; i++) {
        String word = allWords[i];
        if (word == null || word.length() == 0) {
            throw new Exception("invalid word generated");
        }
        revealed[i] = word.charAt(0) + "?".repeat(word.length() - 1);
    }

    return revealed;
  }
  
  public void increaseUserProgress() {
    // Reveal the rest of the letters for the completed word
    this.revealedChain[this.userProgress] = this.chain[this.userProgress];
    int nextLevel = this.userProgress + 1;
    this.userProgress = Math.min(nextLevel, this.chain.length);
  }

  public void revealLetter() {
    String currentWord = this.chain[this.userProgress];
    String currentRevealedWord = this.revealedChain[this.userProgress];
    int nextLetterIndex = currentRevealedWord.indexOf('?');
    // If we can't find a '?' or there's only one letter remaining, don't reveal
    if (nextLetterIndex < 0 || nextLetterIndex >= currentWord.length() - 1) {
      return;
    }
    
    this.revealedChain[this.userProgress] = currentRevealedWord.replaceFirst("\\?", currentWord.substring(nextLetterIndex, nextLetterIndex+1));
  }

  public GamePayload toPayload() {
    return new GamePayload(this.uuid, this.revealedChain, this.userProgress, this.encryptedState);
  }
  
  public String toString() {
    try {
      ObjectMapper mapper = new ObjectMapper();
      return mapper.writeValueAsString(this);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
      return "{}";
    }
  }
  
  public void setUUID(String newUUID) {
    this.uuid = newUUID;
  }
  public String getUUID() {
    return this.uuid;
  }

  public void setChain(String[] newChain) {
    this.chain = newChain;
  }
  public String[] getChain() {
    return this.chain;
  }
  
  public void setRevealedChain(String[] revealed) {
    this.revealedChain = revealed;
  }
  public String[] getRevealedChain() {
    return this.revealedChain;
  }
  
  public void setUserProgress(int newProgress) {
    this.userProgress = newProgress;
  }
  public int getUserProgress() {
    return this.userProgress;
  }
  
  public void setEncryptedState(String state) {
    this.encryptedState = state;
  }
  public String getEncryptedState() {
    return this.encryptedState;
  }
}
