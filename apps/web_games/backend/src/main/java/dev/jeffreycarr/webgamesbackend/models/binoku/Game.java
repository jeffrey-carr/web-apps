/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.binoku;

public class Game {
    private int[][] board;

    public Game(int[][] board) {
        this.board = board;
    }

    public int[][] getBoard() {
        return this.board;
    }
}
