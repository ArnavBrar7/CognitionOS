use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Decision {
    pub intent: String,
    pub action: String,
    pub risk_level: f32,
    pub confidence: f32,
    pub proceed: bool,
    pub outcome_state: String, // Proceed, Warn, Refuse, AskClarification
    pub reasoning: String,
}

#[tauri::command]
pub fn evaluate_action(intent: String, proposed_action: String) -> Result<Decision, String> {
    // In a real implementation, this engine reads the active Constitution rules
    // and queries the ModelRuntime to score the proposed action.

    let is_high_risk = proposed_action.to_lowercase().contains("rm ")
        || proposed_action.to_lowercase().contains("format ")
        || proposed_action.to_lowercase().contains("sudo ");

    let requires_clarification = intent.to_lowercase().contains("maybe")
        || intent.to_lowercase().contains("guess")
        || intent.len() < 10;

    let (risk, confidence, outcome, proceed, reasoning) = if is_high_risk {
        (0.95, 0.99, "Refuse", false, "High risk action requested matching destructive patterns. Constitution weight 'Harm Reduction' mandates refusal.")
    } else if requires_clarification {
        (0.3, 0.4, "AskClarification", false, "Intent is ambiguous or lacks necessary detail. Confidence is low.")
    } else {
        (0.1, 0.9, "Proceed", true, "Action aligned with intent. Low risk detected.")
    };

    Ok(Decision {
        intent,
        action: proposed_action,
        risk_level: risk,
        confidence,
        proceed,
        outcome_state: outcome.to_string(),
        reasoning: reasoning.to_string()
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_evaluate_action_high_risk() {
        let result = evaluate_action("I want to delete everything".into(), "sudo rm -rf /".into()).unwrap();
        assert!(result.risk_level > 0.9);
        assert_eq!(result.proceed, false);
        assert_eq!(result.outcome_state, "Refuse");
    }

    #[test]
    fn test_evaluate_action_safe() {
        let result = evaluate_action("Tell me a joke".into(), "fetch_joke".into()).unwrap();
        assert!(result.risk_level < 0.5);
        assert_eq!(result.proceed, true);
        assert_eq!(result.outcome_state, "Proceed");
    }
}
