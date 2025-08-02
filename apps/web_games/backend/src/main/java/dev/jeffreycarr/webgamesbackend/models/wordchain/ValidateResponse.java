/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.wordchain;

public class ValidateResponse {
    public boolean correct;
    public boolean victory;
    public GamePayload game;

    public ValidateResponse(boolean correct, boolean victory, GamePayload game) {
        this.correct = correct;
        this.victory = victory;
        this.game = game;
    }
}
