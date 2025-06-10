/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.wordchain;

public class ValidateResponse {
    private boolean correct;
    private boolean victory;
    private Game updatedGame;

    public ValidateResponse(boolean correct, boolean victory, Game game) {
        this.correct = correct;
        this.victory = victory;
        this.updatedGame = game;
    }

    public boolean getCorrect() {
        return this.correct;
    }

    public boolean getVictory() {
        return this.victory;
    }

    public Game getUpdatedGame() {
        return this.updatedGame;
    }
}
