use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::State;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Memory {
    pub id: String,
    pub content: String,
    pub memory_type: String, // episodic, semantic, long_term
    pub importance: f32,
    pub created_at: String,
}

pub struct MemoryEngine {
    pub storage_path: PathBuf,
    pub memories: Mutex<Vec<Memory>>,
}

impl MemoryEngine {
    pub fn new() -> Self {
        let storage_path = std::env::current_dir()
            .unwrap_or_default()
            .join("cognitionos_memories.json");

        let memories = if storage_path.exists() {
            let data = fs::read_to_string(&storage_path).unwrap_or_default();
            serde_json::from_str(&data).unwrap_or_else(|_| vec![])
        } else {
            vec![]
        };

        Self {
            storage_path,
            memories: Mutex::new(memories),
        }
    }

    fn save(&self, mems: &Vec<Memory>) -> Result<(), String> {
        let data = serde_json::to_string_pretty(mems)
            .map_err(|e| e.to_string())?;
        fs::write(&self.storage_path, data)
            .map_err(|e| e.to_string())?;
        Ok(())
    }
}

#[tauri::command]
pub fn create_memory(
    content: String,
    memory_type: String,
    importance: f32,
    state: State<'_, MemoryEngine>,
) -> Result<Memory, String> {
    let mut mems = state.memories.lock().map_err(|_| "Failed to lock memory state")?;

    let memory = Memory {
        id: Uuid::new_v4().to_string(),
        content,
        memory_type,
        importance,
        created_at: chrono::Utc::now().to_rfc3339(),
    };

    mems.push(memory.clone());
    state.save(&mems)?;

    Ok(memory)
}

#[tauri::command]
pub fn retrieve_memories(
    query: String,
    state: State<'_, MemoryEngine>,
) -> Result<Vec<Memory>, String> {
    let mems = state.memories.lock().map_err(|_| "Failed to lock memory state")?;

    // Very basic semantic search simulation: keyword matching
    let results: Vec<Memory> = if query.is_empty() {
        mems.clone()
    } else {
        mems.iter()
            .filter(|m| m.content.to_lowercase().contains(&query.to_lowercase()))
            .cloned()
            .collect()
    };

    Ok(results)
}

#[tauri::command]
pub fn delete_memory(id: String, state: State<'_, MemoryEngine>) -> Result<(), String> {
    let mut mems = state.memories.lock().map_err(|_| "Failed to lock memory state")?;

    let initial_len = mems.len();
    mems.retain(|m| m.id != id);

    if mems.len() < initial_len {
        state.save(&mems)?;
        Ok(())
    } else {
        Err("Memory not found".into())
    }
}

#[cfg(test)]
mod tests {
    use super::*;


    // We can test the underlying struct without needing Tauri State
    #[test]
    fn test_memory_engine_initialization() {
        // Just verify it doesn't panic when trying to load/create files
        let engine = MemoryEngine::new();
        assert!(engine.storage_path.ends_with("cognitionos_memories.json"));
    }
}
