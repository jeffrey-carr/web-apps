/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.binoku;

public enum GamePiece {
    EMPTY(-1),
    ZERO(0),
    ONE(1);

    private final int value;

    GamePiece(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
}
