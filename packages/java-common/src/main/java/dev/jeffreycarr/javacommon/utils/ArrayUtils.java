package dev.jeffreycarr.javacommon.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class ArrayUtils {
  public static <T> T getRandomItem(T[] list) {
    int i = (int) Math.floor(Math.random() * list.length);
    return list[i];
  }
  
  public static <T> void shuffle(T[] list) {
    Random random = new Random();
    for (int i = list.length - 1; i > 0; i--) {
      int index = random.nextInt(i + 1);
      T temp = list[index];
      list[index] = list[i];
      list[i] = temp;
    }
  }
  
  public static <T> void shuffleList(List<T> list) {
    Random random = new Random();
    for (int i = list.size() - 1; i > 0; i--) {
      int index = random.nextInt(i + 1);
      T temp = list.get(index);
      list.set(index, list.get(i));
      list.set(i, temp);
    }
  }
  
  public static <T> void reverse(T[] list) {
    for (int i = 0; i < list.length / 2; i++) {
      int inverseI = list.length - i - 1;
      T temp = list[inverseI];
      list[inverseI] = list[i];
      list[i] = temp;
    }
  }

  public static <T> T[] reverseCopy(T[] list) {
    T[] reversed = list.clone();
    reverse(reversed);
    return reversed;
  }
  
  public static <T> T[][] transpose(T[][] matrix) {
    T[][] transposed = matrix.clone();
    int n = transposed.length;
    if (n == 0) {
      return matrix;
    }
    
    for (int i = 0; i < transposed.length; i++) {
      transposed[i] = reverseCopy(transposed[i]);
    }
    
    // For every element in the matrix, assign it to the transposed position
    for (int i = 0; i < n; i++) {
      for (int j = i + 1; j < n; j++) {
        T temp = transposed[i][j];
        transposed[i][j] = transposed[j][i];
        transposed[j][i] = temp;
      }
    }
    
    return transposed;
  }
  
  public static<T> List<List<T>> cloneMatrix(Iterable<? extends Iterable<T>> original) {
    List<List<T>> clone = new ArrayList<>();
    
    for (Iterable<T> row : original) {
      List<T> rowCpy = new ArrayList<>();
      for (T item : row) {
        rowCpy.add(item);
      }
      clone.add(rowCpy);
    }
    
    return clone;
  }
}
