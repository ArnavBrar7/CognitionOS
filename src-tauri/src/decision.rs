use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Decision {
    pub action: String,
    pub risk_level: f32,
    pub confidence: f32,
    pub proceed: bool,
}

#[tauri::command]
pub fn evaluate_action(proposed_action: String) -> Result<Decision, String> {
    // Stub implementation
    Ok(Decision {
        action: proposed_action,
        risk_level: 0.1,
        confidence: 0.9,
        proceed: true,
    })
}
