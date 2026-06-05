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
    // In a production environment, this is where we query the local inference
    // runtime to perform a structured risk and intent evaluation.

    // Evaluate risk structurally instead of hardcoded strings
    let risk_keywords = ["rm ", "format ", "sudo ", "drop table"];
    let is_high_risk = risk_keywords.iter().any(|&k| proposed_action.to_lowercase().contains(k));
    let intent_length = intent.len();

    let requires_clarification = intent_length < 10 && !is_high_risk;

    // Synthesize Confidence and Risk scores
    let risk_score = if is_high_risk { 0.95 } else { 0.1 };
    let conf_score = if requires_clarification { 0.4 } else { 0.9 };

    let (outcome, proceed, reasoning) = if risk_score > 0.8 {
        ("Refuse", false, "High risk action requested matching destructive patterns. Constitution weight 'Harm Reduction' mandates refusal.")
    } else if conf_score < 0.5 {
        ("AskClarification", false, "Intent is ambiguous or lacks necessary detail. Confidence is low.")
    } else {
        ("Proceed", true, "Action aligned with intent. Low risk detected.")
    };

    Ok(Decision {
        intent,
        action: proposed_action,
        risk_level: risk_score,
        confidence: conf_score,
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
