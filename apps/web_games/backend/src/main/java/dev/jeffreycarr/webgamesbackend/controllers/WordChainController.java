/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;

import dev.jeffreycarr.javacommon.constants.AuthConstants;
import dev.jeffreycarr.javacommon.constants.EnvironmentConstants;
import dev.jeffreycarr.javacommon.models.CommonUser;
import dev.jeffreycarr.javacommon.models.VariableNotDefinedException;
import dev.jeffreycarr.javacommon.services.EnvironmentService;
import dev.jeffreycarr.javacommon.utils.ServerResponse;
import dev.jeffreycarr.webgamesbackend.models.wordchain.GameData;
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

        GameData game;
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
        
        String[] chain = game.getChain();
        String gameString = chain[0];
        for (int i = 1; i < chain.length; i++) {
            gameString = String.format("%s --> %s", gameString, chain[i]);
        }
        System.out.println("Created game:");
        System.out.println(gameString);
        
        return ResponseEntity.ok(game.toPayload());
    }

    @PostMapping("/validate-answer")
    public ResponseEntity<?> validateGuess(
        @CookieValue(name = AuthConstants.AuthorizationCookieName, required = false) String authCookie,
        @RequestBody ValidationRequest request
    ) {
        CommonUser user = null;
        if (authCookie != null) {
            user = HandlerUtils.getUserFromCookie(this.env, authCookie);
        }
        boolean isAuthed = user != null;
        
        ValidateResponse response;
        try {
            if (isAuthed) {
                response = this.service.validateGuess(request.payload, request.guess, user);
            } else {
                response = this.service.validateGuess(request.payload, request.guess);
            }
        } catch (JsonProcessingException | IndexOutOfBoundsException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ServerResponse.newMessage("Invalid data"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(ServerResponse.newMessage("Error validating game"));
        }
        
        return ResponseEntity.ok(response);
    }
}
