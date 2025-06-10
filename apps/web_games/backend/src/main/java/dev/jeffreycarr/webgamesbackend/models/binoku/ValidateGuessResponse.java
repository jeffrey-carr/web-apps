/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.binoku;

public class ValidateGuessResponse {
    public final boolean valid;
    public final InvalidBoardHint hint;

    public ValidateGuessResponse(boolean valid, InvalidBoardHint hint) {
        this.valid = valid;
        this.hint = hint;
    }
}
