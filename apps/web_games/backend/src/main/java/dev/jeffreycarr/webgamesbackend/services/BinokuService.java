package dev.jeffreycarr.webgamesbackend.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.jeffreycarr.javacommon.models.CommonUser;
import dev.jeffreycarr.javacommon.utils.ArrayUtils;
import dev.jeffreycarr.webgamesbackend.models.UserStats;
import dev.jeffreycarr.webgamesbackend.models.binoku.BinokuStats;
import dev.jeffreycarr.webgamesbackend.models.binoku.Coordinate;
import dev.jeffreycarr.webgamesbackend.models.binoku.InvalidBoardHint;
import dev.jeffreycarr.webgamesbackend.models.binoku.RuleThreeValidation;
import dev.jeffreycarr.webgamesbackend.models.binoku.ValidateGuessRequest;
import dev.jeffreycarr.webgamesbackend.models.binoku.ValidateGuessResponse;
import dev.jeffreycarr.webgamesbackend.utils.BinokuUtils;

@Component
public class BinokuService {
  private static final int Empty = -1;
  private static final int Zero = 0;
  private static final int One = 1;
  
  private UserStatsService stats;

  @Autowired
  public BinokuService(UserStatsService stats) {
    this.stats = stats;
  }
  
  public Integer[][] createGame(int size, CommonUser user) throws Exception {
    UserStats userStats = this.stats.getOrCreateUserStats(user.uuid);
    BinokuStats binokuStats = userStats.getBinoku();

    Integer[][] board = this.generateBoard(size);
    
    binokuStats.incrementGamesPlayed();
    userStats.setBinoku(binokuStats);
    this.stats.putUserStats(user.uuid, userStats);
    
    return board;
  }
  
  public Integer[][] createGame(int size) throws Exception {
    return this.generateBoard(size);
  }
  
  
  public Integer[][] generateBoard(int size) throws Exception {
    List<List<Integer>> board = new ArrayList<List<Integer>>();
    
    // Fill board with empty spaces
    for (int i = 0; i < size; i++) {
      List<Integer> row = new ArrayList<Integer>();
      for (int j = 0; j < size; j++) {
        row.add(Empty);
      }
      board.add(row);
    }
    
    boolean success = fillBoard(board, 0, 0);
    if (!success) {
      throw new Exception("Error generating board");
    }
    
    List<List<Integer>> puzzle = thinBoard(board);
    return BinokuUtils.cloneBoard(puzzle);
  }
  
  public ValidateGuessResponse validateGuess(ValidateGuessRequest guess, CommonUser user) throws Exception {
    ValidateGuessResponse response = this.validateGuess(guess);
    if (response.valid) {
      System.out.println("Incrementing games completed");
      UserStats userStats = this.stats.getOrCreateUserStats(user.uuid);
      BinokuStats binokuStats = userStats.getBinoku();
      binokuStats.incrementGamesCompleted();
      userStats.setBinoku(binokuStats);
      this.stats.putUserStats(user.uuid, userStats);
    }

    return response;
  }
  public ValidateGuessResponse validateGuess(ValidateGuessRequest guess) {
    int size = guess.board.length;
    
    // First, validate the board has no empty spaces
    for (int rowI = 0; rowI < size; rowI++) {
      Integer[] row = guess.board[rowI];
      for (int colI = 0; colI < size; colI++) {
        Integer value = row[colI];
        if (value == Empty) {
          return new ValidateGuessResponse(false, new InvalidBoardHint(new Integer[]{rowI}, new Integer[]{colI}));
        }
      }
    }
    
    return boardIsValid(guess.toList());
  }
  
  private boolean fillBoard(List<List<Integer>> board, int row, int col) {
    int n = board.size();
    if (row == n) {
      return true;
    }
    
    int nextRow = row;
    int nextCol = col + 1;
    if (nextCol >= n) {
      nextCol = 0;
      nextRow++;
    }
    
    // Randomly pick a 0 or 1
    Integer[] options = new Integer[]{0, 1};
    ArrayUtils.shuffle(options);
    for (int value : options) {
      if (valueIsValid(board, row, col, value)) {
        board.get(row).set(col, value);
        if (fillBoard(board, nextRow, nextCol)) {
          return true;
        }
        // It didn't work, undo move
        board.get(row).set(col, Empty);
      }
    }
    
    return false;
  }
  
  /**
   * Removes values from board until the most number of unique
   * values have been removed and still have a uniquely solvable solution
   * @param board
   * @return A matrix of valid game pieces
   */
  private List<List<Integer>> thinBoard(List<List<Integer>> board) {
    int n = board.size();
    
    // To convert a board into a puzzle:
    // Step 1: Remove a number
    // Step 2: Check if board is still uniquely solvable

    // To minimize going down bad routes and for a better user experience,
    // we will attempt to take an equal amount from each quadrant, so we
    // will visit the quadrants in a round-robin fashion
    List<Coordinate> topLeft = new ArrayList<>();
    List<Coordinate> topRight = new ArrayList<>();
    List<Coordinate> bottomLeft = new ArrayList<>();
    List<Coordinate> bottomRight = new ArrayList<>();
    for (int row = 0; row < n; row++) {
      for(int col = 0; col < n; col++) {
        Coordinate coord = new Coordinate(row, col);

        boolean top = row < n / 2;
        boolean left = col < n / 2;
        if (top && left) {
          topLeft.add(coord);
        } else if (top) {
          topRight.add(coord);
        } else if (left) {
          bottomLeft.add(coord);
        } else {
          bottomRight.add(coord);
        }
      }
    }
    // Shuffle to make sure we are visiting cells randomly
    ArrayUtils.shuffleList(topLeft);
    ArrayUtils.shuffleList(topRight);
    ArrayUtils.shuffleList(bottomLeft);
    ArrayUtils.shuffleList(bottomRight);

    // Now merge them into a new copy
    List<Coordinate> coords = new ArrayList<>();
    for (int i = 0; i < n * n; i++) {
      Coordinate coord;
      if (i % 4 == 0 && topLeft.size() > 0) {
        coord = topLeft.removeFirst();
      } else if (i % 4 == 1 && topRight.size() > 0) {
        coord = topRight.removeFirst();
      } else if (i % 4 == 2 && bottomLeft.size() > 0) {
        coord = bottomLeft.removeFirst();
      } else {
        coord = bottomRight.removeFirst();
      }
      
      coords.add(coord);
    }
    
    List<Coordinate> emptySpaces = new ArrayList<>();

    // We can start by removing the first space, since there is nothing to solve
    Coordinate coord = coords.removeFirst();
    board.get(coord.row).set(coord.col, Empty);
    emptySpaces.add(coord);

    int batchSize = 3;
    int maxItr = 1000;
    int itr = 0;
    double targetRemoved = (double) board.size() * 0.3;
    while ((double) coords.size() > targetRemoved && itr < maxItr) {
      itr++;
      
      // Step 1 - remove spaces batchSize at a time
      Map<Coordinate, Integer> removedValues = new HashMap<>();
      int toRemove = coords.size() >= batchSize ? batchSize : coords.size();
      List<Coordinate> recentelyRemoved = new ArrayList<>();
      for (int i = 0; i < toRemove; i++) {
        coord = coords.removeFirst();
        emptySpaces.add(coord);
        removedValues.put(coord, board.get(coord.row).get(coord.col));
        board.get(coord.row).set(coord.col, Empty);
        recentelyRemoved.add(coord);
      }
      
      // Step 2 - Check if the board is still uniquely solvable with this piece removed
      if (!isUniquelySolvable(board, emptySpaces)) {
        // If it isn't, put back one number at a time
        boolean foundUnique = false;
        for (int i = 0; i < batchSize; i++) {
          coord = emptySpaces.removeLast();
          Integer value = removedValues.get(coord);
          coords.add(coord);
          
          board.get(coord.row).set(coord.col, value);
          removedValues.remove(coord);
          
          if (isUniquelySolvable(board, emptySpaces)) {
            foundUnique = true;
            break;
          }
        }
        
        if (!foundUnique || itr >= maxItr - 3) {
          return board;
        }
      }
    }

    return board;
  }
  
  private boolean isUniquelySolvable(List<List<Integer>> board, List<Coordinate> emptySpaces) {
    int[] count = new int[]{0};
    countSolutions(board, new ArrayList<>(emptySpaces), count);
    return count[0] == 1;
  }
  
  private void countSolutions(List<List<Integer>> board, List<Coordinate> emptySpaces, int[] count) {
    // Base case
    if (emptySpaces.size() == 0) {
      count[0]++;
      return;
    }
    
    if (count[0] > 1) {
      return;
    }
    
    Coordinate coord = emptySpaces.removeFirst();

    if (valueIsValid(board, coord.row, coord.col, Zero)) {
      List<List<Integer>> bCpy = ArrayUtils.cloneMatrix(board);
      bCpy.get(coord.row).set(coord.col, Zero);
      countSolutions(bCpy, emptySpaces, count);
    }
    if (valueIsValid(board, coord.row, coord.col, One)) {
      List<List<Integer>> bCpy = ArrayUtils.cloneMatrix(board);
      bCpy.get(coord.row).set(coord.col, One);
      countSolutions(bCpy, emptySpaces, count);
    }
  }
  
  private boolean valueIsValid(List<List<Integer>> toValidate, int row, int col, int value) {
    // Clone the board
    List<List<Integer>> board = new ArrayList<>();
    for (List<Integer> originalRow : toValidate) {
      board.add(new ArrayList<>(originalRow));
    }

    board.get(row).set(col, value);
    return boardIsValid(board).valid;
  }

  public ValidateGuessResponse boardIsValid(List<List<Integer>> board) {
    // The game has 3 rules:
    // 1. There must be an equal number of 1's and 0's in each row/column
    // 2. There cannot be more than 2 consecutive values next to each other in each row/column
    // 3. There cannot be any identical rows or any identical columns
    for (int rowI = 0; rowI < board.size(); rowI++) {
      List<Integer> row = board.get(rowI);

      boolean ruleOneValid = this.validateRuleOne(row);
      if (!ruleOneValid) {
        InvalidBoardHint hint = new InvalidBoardHint(new Integer[]{rowI}, new Integer[]{});
        return new ValidateGuessResponse(false, hint);
      }
      
      boolean ruleTwoValid = this.validateRuleTwo(row);
      if (!ruleTwoValid) {
        InvalidBoardHint hint = new InvalidBoardHint(new Integer[]{rowI}, new Integer[]{});
        return new ValidateGuessResponse(false, hint);
      }
      
      RuleThreeValidation ruleThreeValidation = this.validateRuleThree(rowI, board);
      if (!ruleThreeValidation.valid) {
        InvalidBoardHint hint = new InvalidBoardHint(new Integer[]{rowI, ruleThreeValidation.invalidRow}, new Integer[]{});
        return new ValidateGuessResponse(false, hint);
      }
    }
    
    // Transpose the matrix 90 degrees and check the columns
    Integer[][] transposedArray = BinokuUtils.cloneBoard(board);
    int n = transposedArray.length;
    
    for (int i = 0; i < transposedArray.length; i++) {
      transposedArray[i] = ArrayUtils.reverseCopy(transposedArray[i]);
    }
    
    // For every element in the matrix, assign it to the transposed position
    for (int i = 0; i < n; i++) {
      for (int j = i + 1; j < n; j++) {
        Integer temp = transposedArray[i][j];
        transposedArray[i][j] = transposedArray[j][i];
        transposedArray[j][i] = temp;
      }
    }
    
    // Integer[][] transposedArr = ArrayUtils.transpose(board.toArray(new Integer[0][]));
    List<List<Integer>> transposed = new ArrayList<>();
    for (Integer[] transposedRow : transposedArray) {
      transposed.add(Arrays.asList(transposedRow));
    }
    
    for (int i = 0; i < transposed.size(); i++) {
      List<Integer> col = transposed.get(i);

      boolean ruleOneValid = validateRuleOne(col);
      if (!ruleOneValid) {
        InvalidBoardHint hint = new InvalidBoardHint(new Integer[]{}, new Integer[]{i});
        return new ValidateGuessResponse(false, hint);
      }
      
      boolean ruleTwoValid = validateRuleTwo(col);
      if (!ruleTwoValid) {
        InvalidBoardHint hint = new InvalidBoardHint(new Integer[]{}, new Integer[]{i});
        return new ValidateGuessResponse(false, hint);
      }
      
      RuleThreeValidation ruleThreeValidation = validateRuleThree(i, transposed);
      if (!ruleThreeValidation.valid) {
        InvalidBoardHint hint = new InvalidBoardHint(new Integer[]{}, new Integer[]{i, ruleThreeValidation.invalidRow});
        return new ValidateGuessResponse(false, hint);
      }
    }
    
    return new ValidateGuessResponse(true, null);
  }
  
  // 1. There must be an equal number of 1's and 0's in each row/column
  private boolean validateRuleOne(List<Integer> row) {
    int rowZeroes = 0;
    int rowOnes = 0;
    for (int value : row) {
      if (value == 0) {
        rowZeroes++;
      }
      if (value == 1) {
        rowOnes++;
      }
    }
    
    return 
      rowZeroes <= row.size() / 2 &&
      rowOnes <= row.size() / 2;
  }
  
  // 2. There cannot be more than 2 consecutive values next to each other in each row/column
  private boolean validateRuleTwo(List<Integer> row) {
    for (int i = 0; i < row.size(); i++) {
      int value = row.get(i);

      if (i < 2 || value < 0) {
        continue;
      }
      
      if (value == row.get(i-1) && value == row.get(i-2)) {
        return false;
      }
    }
    
    return true;
  }
  
  // 3. There cannot be any identical rows or any identical columns
  // Returns whether the rule is valid. If not, provides the index of
  // the first matched column
  /**
   * Rule 3 says there cannot be any identical rows or any identical columns
   * @param rowI
   * @param board
   * @return RuleThreeValidation with a boolean to determine if the board is valid and the offending row if it is not valid
   */
  private RuleThreeValidation validateRuleThree(Integer rowI, List<List<Integer>> board) {
    if (rowI < 0 || rowI > board.size()) {
      return new RuleThreeValidation(false, -1);
    }
    
    List<Integer> row = board.get(rowI);
    for (int i = 0; i < board.size(); i++) {
      if (i == rowI) {
        continue;
      }
      
      List<Integer> currentRow = board.get(i);
      boolean isEqual = true;
      for (int j = 0; j < currentRow.size(); j++) {
        if (
          // If any spaces are blank, the rows can't be equal
          row.get(j) == -1 ||
          currentRow.get(j) == -1 ||
          row.get(j) != currentRow.get(j)
        ) {
          isEqual = false;
          break;
        }
      }
      
      if (isEqual) {
        return new RuleThreeValidation(false, i);
      }
    }
    
    return new RuleThreeValidation(true, -1);
  }
}  