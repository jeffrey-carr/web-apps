/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.jeffreycarr.javacommon.models.CommonUser;
import dev.jeffreycarr.javacommon.services.EncryptionError;
import dev.jeffreycarr.javacommon.services.EncryptionService;
import dev.jeffreycarr.javacommon.utils.ArrayUtils;
import dev.jeffreycarr.webgamesbackend.models.UserStats;
import dev.jeffreycarr.webgamesbackend.models.wordchain.Dictionary;
import dev.jeffreycarr.webgamesbackend.models.wordchain.GameData;
import dev.jeffreycarr.webgamesbackend.models.wordchain.GamePayload;
import dev.jeffreycarr.webgamesbackend.models.wordchain.ValidateResponse;
import dev.jeffreycarr.webgamesbackend.models.wordchain.WordChainStats;

import java.util.Map;
import java.util.Stack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WordChainService {
    private static final int TARGET_CHAIN_LENGTH = 7;

    private Map<String, String[]> dictionary;
    private EncryptionService encrypter;
    private UserStatsService stats;

    @Autowired
    public WordChainService(Dictionary dictionary, EncryptionService encryption, UserStatsService stats) {
        this.dictionary = dictionary.getValues();
        this.encrypter = encryption;
        this.stats = stats;
    }

    public GameData createGame(CommonUser user) throws Exception {
        UserStats userStats = this.stats.getOrCreateUserStats(user.uuid);
        WordChainStats wordChainStats = userStats.getWordChain();
        wordChainStats.incrementGamesPlayed();

        GameData game = this.createGame();
        
        this.stats.putUserStats(user.uuid, userStats);
        return game;
    }
    public GameData createGame() throws Exception {
        Stack<String> chainStack = this.generateChain(new Stack<String>());
        String[] chain = chainStack.toArray(new String[0]);

        GameData game = new GameData(chain);
        String encryptedState = this.encrypter.encrypt(game.toString());
        game.setEncryptedState(encryptedState);

        return game;
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
    
    public ValidateResponse validateGuess(GamePayload payload, String guess, CommonUser user) throws Exception {
        UserStats userStats = this.stats.getOrCreateUserStats(user.uuid);
        WordChainStats wordChainStats = userStats.getWordChain();
        
        ValidateResponse response = validateGuess(payload, guess);
        
        if (response.victory) {
            wordChainStats.incrementGamesCompleted();
            userStats.setWordChain(wordChainStats);
            this.stats.putUserStats(user.uuid, userStats);
        }

        return response;
    }

    public ValidateResponse validateGuess(GamePayload payload, String guess)
            throws JsonMappingException,
                    JsonProcessingException,
                    IndexOutOfBoundsException,
                    Exception {
        String decryptedGameData = this.encrypter.decrypt(payload.encryptedState);
        if (decryptedGameData.length() == 0) {
            throw new EncryptionError("Error decrypting game state");
        }

        GameData data = new ObjectMapper().readValue(decryptedGameData, GameData.class);
        if (data.getUserProgress() < 0 || data.getUserProgress() >= data.getChain().length) {
            throw new IndexOutOfBoundsException("User progress out of bounds");
        }

        String[] chain = data.getChain();
        int progress = data.getUserProgress();
        if (!guess.equalsIgnoreCase(chain[progress])) {
            return this.invalidGuess(data);
        }
        
        return this.validGuess(data);
    }
    
    private ValidateResponse invalidGuess(GameData game) throws Exception {
        game.revealLetter();
        String encryptedUpdate = this.encrypter.encrypt(game.toString());
        game.setEncryptedState(encryptedUpdate);
        
        return new ValidateResponse(false, false, game.toPayload());
    }
    
    private ValidateResponse validGuess(GameData game) throws Exception {
        game.increaseUserProgress();
        boolean isVictory = game.getChain().length == game.getUserProgress();

        String encryptedUpdatedGame = this.encrypter.encrypt(game.toString());
        game.setEncryptedState(encryptedUpdatedGame);

        return new ValidateResponse(true, isVictory, game.toPayload());
    }
}
