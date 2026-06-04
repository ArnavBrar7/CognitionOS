use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ConstitutionRule {
    pub name: String,
    pub weight: f32,
}

#[tauri::command]
pub fn get_constitution() -> Result<Vec<ConstitutionRule>, String> {
    Ok(vec![
        ConstitutionRule { name: "Honesty".into(), weight: 1.0 },
        ConstitutionRule { name: "Harm Reduction".into(), weight: 1.0 },
        ConstitutionRule { name: "User Benefit".into(), weight: 0.9 },
    ])
}
