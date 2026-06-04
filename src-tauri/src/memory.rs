use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Memory {
    pub id: String,
    pub content: String,
    pub memory_type: String, // episodic, semantic, long_term
    pub importance: f32,
}

#[tauri::command]
pub fn retrieve_memories(query: String) -> Result<Vec<Memory>, String> {
    // Stub implementation
    Ok(vec![
        Memory {
            id: "1".into(),
            content: format!("Memory related to {}", query),
            memory_type: "semantic".into(),
            importance: 0.8,
        }
    ])
}
