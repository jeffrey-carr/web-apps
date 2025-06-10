/* (C)2025 */
package dev.jeffreycarr.webgamesbackend.models.binoku;

public class RuleThreeValidation {
    public final boolean valid;
    public final int invalidRow;

    public RuleThreeValidation(boolean isValid, int invalidRow) {
        this.valid = isValid;
        this.invalidRow = invalidRow;
    }
}
