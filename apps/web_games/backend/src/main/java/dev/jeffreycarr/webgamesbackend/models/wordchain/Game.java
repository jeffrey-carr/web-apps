/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.wordchain;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Game {
    public final GameData data;
    private final String encryptedState;

    public Game(
            @JsonProperty("data") GameData data,
            @JsonProperty("encryptedState") String encryptedState) {
        this.data = data;
        this.encryptedState = encryptedState;
    }

    public String getEncryptedState() {
        return this.encryptedState;
    }
}
