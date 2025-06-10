/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.binoku;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ValidateGuessRequest {
    public final Integer[][] board;

    public ValidateGuessRequest(Integer[][] board) {
        this.board = board;
    }
    
    public List<List<Integer>> toList() {
        List<List<Integer>> list = new ArrayList<>();

        for (Integer[] row : board) {
            list.add(Arrays.asList(row));
        }
        
        return list;
    }
}
