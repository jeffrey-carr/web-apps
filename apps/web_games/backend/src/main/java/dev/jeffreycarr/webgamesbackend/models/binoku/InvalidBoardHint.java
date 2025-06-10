/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.binoku;

public class InvalidBoardHint {
    public final Integer[] rows;
    public final Integer[] cols;

    public InvalidBoardHint(Integer[] rows, Integer[] cols) {
        this.rows = rows;
        this.cols = cols;
    }
}
