/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;

import dev.jeffreycarr.javacommon.constants.AuthConstants;
import dev.jeffreycarr.javacommon.constants.EnvironmentConstants;
import dev.jeffreycarr.javacommon.models.CommonUser;
import dev.jeffreycarr.javacommon.models.VariableNotDefinedException;
import dev.jeffreycarr.javacommon.services.EnvironmentService;
import dev.jeffreycarr.javacommon.utils.ServerResponse;
import dev.jeffreycarr.webgamesbackend.models.wordchain.Game;
import dev.jeffreycarr.webgamesbackend.models.wordchain.ValidateResponse;
import dev.jeffreycarr.webgamesbackend.models.wordchain.ValidationRequest;
import dev.jeffreycarr.webgamesbackend.services.WordChainService;
import dev.jeffreycarr.webgamesbackend.utils.HandlerUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/word-chain")
public class WordChainController {
    private WordChainService service;
    private String env;

    @Autowired
    public WordChainController(WordChainService service, EnvironmentService environment) {
        this.service = service;
        
        try {
            this.env = environment.get(EnvironmentConstants.Environment);
        } catch (VariableNotDefinedException e) {
            this.env = EnvironmentConstants.DevEnvironment;
        }
    }

    @GetMapping("/new-game")
    public ResponseEntity<?> createGame(@CookieValue(name = AuthConstants.AuthorizationCookieName, required = false) String authCookie) {
        CommonUser user = null;
        if (authCookie != null) {
            user = HandlerUtils.getUserFromCookie(this.env, authCookie);
        }
        boolean isAuthed = user != null;

        Game game;
        try {
            if (isAuthed) {
                game = this.service.createGame(user);
            } else {
                game = this.service.createGame();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ServerResponse.newMessage("Error creating game"));
        }

        return ResponseEntity.ok(game);
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
            return ResponseEntity.internalServerError()
                    .body(ServerResponse.newMessage("Error validating game"));
        }
    }
}
