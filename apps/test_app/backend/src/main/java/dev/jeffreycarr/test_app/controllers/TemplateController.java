/* (C)2025 */
package dev.jeffreycarr.testapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.jeffreycarr.testapp.services.TemplateService;
import dev.jeffreycarr.testapp.models.TemplateModel;

@RestController
@RequestMapping("/api/test")
public class TemplateController {
    TemplateService service;

    @Autowired
    public TemplateController(TemplateService service) {
        this.service = service;
    }

    @GetMapping("/")
    public ResponseEntity<?> createGame() {
        TemplateModel response = this.service.test();
        return ResponseEntity.ok().body(response);
    }
}
