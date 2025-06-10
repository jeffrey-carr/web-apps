/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.controllers;

import dev.jeffreycarr.javacommon.utils.ServerResponse;
import dev.jeffreycarr.webgamesbackend.models.binoku.ValidateGuessRequest;
import dev.jeffreycarr.webgamesbackend.services.BinokuService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    public BinokuController(BinokuService service) {
        this.service = service;
    }

    @GetMapping("/new-game")
    public ResponseEntity<?> createGame(@RequestParam("size") @Min(4) @Max(10) int size) {
        if (size % 2 != 0) {
            return ResponseEntity.badRequest()
                    .body(ServerResponse.newMessage("Invalid board size"));
        }

        try {
            return ResponseEntity.ok().body(this.service.generateBoard(size));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ServerResponse.newMessage("Error creating game"));
        }
    }
    
    @PostMapping("/validate-board")
    public ResponseEntity<?> validateBoard(@RequestBody ValidateGuessRequest guess) {
        try {
            return ResponseEntity.ok().body(this.service.validateGuess(guess));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ServerResponse.newMessage("Error validating guess"));
        }
    }
}
