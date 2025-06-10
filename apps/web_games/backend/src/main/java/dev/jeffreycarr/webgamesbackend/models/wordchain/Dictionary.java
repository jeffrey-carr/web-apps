/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.wordchain;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class Dictionary {
    private Map<String, String[]> dictionary;

    public Map<String, String[]> getValues() {
        return this.dictionary;
    }

    @PostConstruct
    public void loadDictionary() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream is =
                    getClass().getClassLoader().getResourceAsStream("word_chain_dictionary.json");
            this.dictionary =
                    mapper.readValue(
                            is,
                            mapper.getTypeFactory()
                                    .constructMapType(Map.class, String.class, String[].class));
        } catch (Exception e) {
            throw new RuntimeException("Failed to load dictionary", e);
        }
    }
}
