package dev.jeffreycarr.webgamesbackend.controllers;

import dev.jeffreycarr.javacommon.constants.AuthConstants;
import dev.jeffreycarr.javacommon.constants.EnvironmentConstants;
import dev.jeffreycarr.javacommon.models.CommonUser;
import dev.jeffreycarr.javacommon.models.VariableNotDefinedException;
import dev.jeffreycarr.javacommon.services.EnvironmentService;
import dev.jeffreycarr.javacommon.utils.ServerResponse;
import dev.jeffreycarr.webgamesbackend.models.binoku.ValidateGuessRequest;
import dev.jeffreycarr.webgamesbackend.services.BinokuService;
import dev.jeffreycarr.webgamesbackend.utils.HandlerUtils;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/binoku")
public class BinokuController {
    private BinokuService service;
    private String env;

    @Autowired
    public BinokuController(BinokuService service, EnvironmentService environment) {
        this.service = service;
        
        try {
            this.env = environment.get(EnvironmentConstants.Environment);
        } catch (VariableNotDefinedException e) {
            this.env = EnvironmentConstants.DevEnvironment;
        }
    }

    @GetMapping("/new-game")
    public ResponseEntity<?> createGame(@CookieValue(name = AuthConstants.AuthorizationCookieName, required = false) String authCookie, @RequestParam("size") @Min(4) @Max(10) int size) {
        if (size % 2 != 0) {
            return ResponseEntity.badRequest()
                    .body(ServerResponse.newMessage("Invalid board size"));
        }

        CommonUser user = null;
        if (authCookie != null) {
            user = HandlerUtils.getUserFromCookie(this.env, authCookie);
        }
        boolean isAuthed = user != null;

        Integer[][] board;
        try {
            if (isAuthed) {
                board = this.service.createGame(size, user);
            } else {
                board = this.service.createGame(size);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ServerResponse.newMessage("Error creating game"));
        }
        
        return ResponseEntity.ok(board);
    }
    
    @PostMapping("/validate-board")
    public ResponseEntity<?> validateBoard(@CookieValue(name = AuthConstants.AuthorizationCookieName, required = false) String authCookie, @RequestBody ValidateGuessRequest guess) {
        CommonUser user = null;
        if (authCookie != null) {
            user = HandlerUtils.getUserFromCookie(this.env, authCookie);
        }
        boolean isAuthed = user != null;

        try {
            if (isAuthed) {
                return ResponseEntity.ok(this.service.validateGuess(guess, user));
            }

            return ResponseEntity.ok(this.service.validateGuess(guess));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error validating guess"));
        }
    }
}
