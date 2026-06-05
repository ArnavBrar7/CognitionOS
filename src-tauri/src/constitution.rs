use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::State;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ConstitutionRule {
    pub name: String,
    pub weight: f32,
    pub description: String,
}

pub struct ConstitutionEngine {
    pub storage_path: PathBuf,
    pub rules: Mutex<Vec<ConstitutionRule>>,
}

impl ConstitutionEngine {
    pub fn new() -> Self {
        let storage_path = std::env::current_dir()
            .unwrap_or_default()
            .join("cognitionos_constitution.json");

        let rules = if storage_path.exists() {
            let data = fs::read_to_string(&storage_path).unwrap_or_default();
            serde_json::from_str(&data).unwrap_or_else(|_| Self::default_rules())
        } else {
            Self::default_rules()
        };

        Self {
            storage_path,
            rules: Mutex::new(rules),
        }
    }

    fn default_rules() -> Vec<ConstitutionRule> {
        vec![
            ConstitutionRule {
                name: "Honesty".into(),
                weight: 1.0,
                description: "Prioritize factual accuracy. State uncertainty explicitly.".into()
            },
            ConstitutionRule {
                name: "Harm Reduction".into(),
                weight: 1.0,
                description: "Refuse execution of tools that risk system destruction.".into()
            },
            ConstitutionRule {
                name: "User Benefit".into(),
                weight: 0.9,
                description: "Attempt to fulfill requests efficiently if risk is low.".into()
            },
        ]
    }

    fn save(&self, current_rules: &Vec<ConstitutionRule>) -> Result<(), String> {
        let data = serde_json::to_string_pretty(current_rules)
            .map_err(|e| e.to_string())?;
        fs::write(&self.storage_path, data)
            .map_err(|e| e.to_string())?;
        Ok(())
    }
}

#[tauri::command]
pub fn get_constitution(state: State<'_, ConstitutionEngine>) -> Result<Vec<ConstitutionRule>, String> {
    let rules = state.rules.lock().map_err(|_| "Failed to lock constitution state")?;
    Ok(rules.clone())
}

#[tauri::command]
pub fn update_constitution_rule(
    name: String,
    weight: f32,
    state: State<'_, ConstitutionEngine>
) -> Result<Vec<ConstitutionRule>, String> {
    let mut rules = state.rules.lock().map_err(|_| "Failed to lock constitution state")?;

    if let Some(rule) = rules.iter_mut().find(|r| r.name == name) {
        rule.weight = weight;
        state.save(&rules)?;
    } else {
        return Err("Rule not found".into());
    }

    Ok(rules.clone())
}
