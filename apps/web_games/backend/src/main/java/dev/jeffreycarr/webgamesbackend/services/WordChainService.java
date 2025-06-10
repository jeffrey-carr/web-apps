/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import dev.jeffreycarr.javacommon.services.EncryptionError;
import dev.jeffreycarr.javacommon.services.EncryptionService;
import dev.jeffreycarr.javacommon.utils.ArrayUtils;
import dev.jeffreycarr.webgamesbackend.models.wordchain.Dictionary;
import dev.jeffreycarr.webgamesbackend.models.wordchain.Game;
import dev.jeffreycarr.webgamesbackend.models.wordchain.GameData;
import dev.jeffreycarr.webgamesbackend.models.wordchain.ValidateResponse;
import java.util.Map;
import java.util.Stack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WordChainService {
    private static final int TARGET_CHAIN_LENGTH = 7;

    private Map<String, String[]> dictionary;
    private EncryptionService encrypter;

    @Autowired
    public WordChainService(Dictionary dictionary, EncryptionService encryption) {
        this.dictionary = dictionary.getValues();
        this.encrypter = encryption;
    }

    public Game createGame() throws Exception {
        Stack<String> chain = this.generateChain(new Stack<String>());
        GameData data = new GameData(chain);
        String encryptedState = this.encrypter.encrypt(data.toString());

        return new Game(data, encryptedState);
    }

    private Stack<String> generateChain(Stack<String> currentChain) {
        if (currentChain.size() == 0) {
            String word = ArrayUtils.getRandomItem(this.dictionary.keySet().toArray(new String[0]));
            currentChain.add(word);
        }

        // Base case
        if (currentChain.size() == TARGET_CHAIN_LENGTH) {
            return currentChain;
        }

        // Using the last word, find a word that works with the ladder
        String previousWord = currentChain.peek();
        String[] possibleWords = this.dictionary.get(previousWord);
        if (possibleWords == null) {
            currentChain.pop();
            return this.generateChain(currentChain);
        }

        String nextWord = ArrayUtils.getRandomItem(possibleWords);
        currentChain.push(nextWord);
        return this.generateChain(currentChain);
    }

    public ValidateResponse validateGuess(Game currentGame, String guess)
            throws JsonMappingException,
                    JsonProcessingException,
                    IndexOutOfBoundsException,
                    Exception {
        String decryptedGameData = this.encrypter.decrypt(currentGame.getEncryptedState());
        if (decryptedGameData.length() == 0) {
            throw new EncryptionError("Error decrypting game state");
        }

        GameData data = GameData.fromJson(decryptedGameData);
        if (data.getUserProgress() >= data.getGeneratedChain().length) {
            throw new IndexOutOfBoundsException("User progress out of bounds");
        }

        String[] chain = data.getGeneratedChain();
        int progress = data.getUserProgress();
        if (guess.equalsIgnoreCase(chain[progress])) {
            data.increaseUserProgress();
            String encryptedUpdatedGame = this.encrypter.encrypt(data.toString());
            return new ValidateResponse(
                    true,
                    data.getUserProgress() == chain.length,
                    new Game(data, encryptedUpdatedGame));
        } else {
            return new ValidateResponse(false, false, currentGame);
        }
    }
}
