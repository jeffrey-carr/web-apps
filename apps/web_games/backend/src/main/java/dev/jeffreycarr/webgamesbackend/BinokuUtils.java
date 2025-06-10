/* (C)2025 */
package dev.jeffreycarr.webgamesbackend;

import java.util.List;

public class BinokuUtils {
    public static Integer[][] cloneBoard(List<List<Integer>> board) {
        Integer[][] clone = new Integer[board.size()][board.size()];
        for (int i = 0; i < clone.length; i++) {
            clone[i] = board.get(i).toArray(new Integer[0]);
        }

        return clone;
    }
}
