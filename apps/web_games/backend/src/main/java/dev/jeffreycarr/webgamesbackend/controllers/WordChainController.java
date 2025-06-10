/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import dev.jeffreycarr.javacommon.utils.ServerResponse;
import dev.jeffreycarr.webgamesbackend.models.wordchain.ValidateResponse;
import dev.jeffreycarr.webgamesbackend.models.wordchain.ValidationRequest;
import dev.jeffreycarr.webgamesbackend.services.WordChainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/word-chain")
public class WordChainController {
    private WordChainService service;

    @Autowired
    public WordChainController(WordChainService service) {
        this.service = service;
    }

    @GetMapping("/new-game")
    public ResponseEntity<?> createGame() {
        try {
            return ResponseEntity.ok().body(this.service.createGame());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ServerResponse.newMessage("Error creating game"));
        }
    }

    @PostMapping("/validate-answer")
    public ResponseEntity<?> validateGuess(@RequestBody ValidationRequest request) {
        try {
            ValidateResponse response =
                    this.service.validateGuess(request.getGameState(), request.getGuess());
            return ResponseEntity.ok(response);
        } catch (JsonProcessingException | IndexOutOfBoundsException e) {
            return ResponseEntity.badRequest().body(ServerResponse.newMessage("Invalid data"));
        } catch (Exception e) {
            System.out.printf("Error: %s\n", e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ServerResponse.newMessage("Error validating game"));
        }
    }
}
