/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.wordchain;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.jeffreycarr.javacommon.utils.StringUtils;
import java.util.Stack;

public class GameData {
    private final String uuid;
    private final String[] generatedChain;
    private int userProgress;

    public GameData(
            @JsonProperty("uuid") String uuid,
            @JsonProperty("generatedChain") String[] generatedChain,
            @JsonProperty("userProgress") int userProgress) {
        this.uuid = uuid;
        this.generatedChain = generatedChain;
        this.userProgress = userProgress;
    }

    public GameData(String[] chain) {
        this(StringUtils.newUUID(), chain, 1);
    }

    public GameData(Stack<String> chain) {
        this(chain.toArray(new String[0]));
    }

    public static GameData fromJson(String stringified)
            throws JsonMappingException, JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(stringified, GameData.class);
    }

    public String getUUID() {
        return this.uuid;
    }

    public String[] getGeneratedChain() {
        return this.generatedChain;
    }

    public int getUserProgress() {
        return this.userProgress;
    }

    public void increaseUserProgress() {
        this.userProgress = Math.min(this.userProgress + 1, this.generatedChain.length);
    }

    public String toString() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{}";
        }
    }
}
