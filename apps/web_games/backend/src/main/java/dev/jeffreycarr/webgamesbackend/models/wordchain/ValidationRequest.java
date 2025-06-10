/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.wordchain;

import jakarta.validation.constraints.*;

public class ValidationRequest {
    @NotEmpty private String guess;
    @NotNull private Game gameState;

    public String getGuess() {
        return this.guess;
    }

    public Game getGameState() {
        return this.gameState;
    }
}
