/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.wordchain;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class ValidationRequest {
    @NotEmpty public String guess;
    @NotNull public GamePayload payload;
}
