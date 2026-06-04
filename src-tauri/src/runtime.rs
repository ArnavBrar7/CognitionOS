use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct RuntimeState {
    pub is_running: bool,
    pub current_model: Option<String>,
}

#[tauri::command]
pub fn get_runtime_state() -> Result<RuntimeState, String> {
    Ok(RuntimeState {
        is_running: true,
        current_model: Some("llama-3-8b.gguf".into()),
    })
}
