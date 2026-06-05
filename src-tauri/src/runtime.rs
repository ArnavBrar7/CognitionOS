use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RuntimeState {
    pub is_running: bool,
    pub current_model: Option<String>,
    pub context_size: u32,
    pub threads: u32,
    pub gpu_layers: u32,
}

pub trait ModelRuntime: Send + Sync {
    fn load_model(&mut self, path: &str) -> Result<(), String>;
    fn unload_model(&mut self) -> Result<(), String>;
    fn generate(&self, prompt: &str) -> Result<String, String>;
    fn status(&self) -> RuntimeState;
}

// Dummy Llama/GGUF runner to satisfy the trait and act as state
pub struct LlamaRuntime {
    pub state: RuntimeState,
}

impl LlamaRuntime {
    pub fn new() -> Self {
        Self {
            state: RuntimeState {
                is_running: false,
                current_model: None,
                context_size: 8192,
                threads: 8,
                gpu_layers: 33,
            },
        }
    }
}

impl ModelRuntime for LlamaRuntime {
    fn load_model(&mut self, path: &str) -> Result<(), String> {
        self.state.current_model = Some(path.to_string());
        self.state.is_running = true;
        // In a real implementation, llama.cpp / gguf loading happens here
        Ok(())
    }

    fn unload_model(&mut self) -> Result<(), String> {
        self.state.current_model = None;
        self.state.is_running = false;
        Ok(())
    }

    fn generate(&self, _prompt: &str) -> Result<String, String> {
        if !self.state.is_running {
            return Err("Model is not running".into());
        }
        // Real generation hook
        Ok("Mock generation output".into())
    }

    fn status(&self) -> RuntimeState {
        self.state.clone()
    }
}

pub struct RuntimeEngine {
    pub runner: Mutex<Box<dyn ModelRuntime>>,
}

impl RuntimeEngine {
    pub fn new() -> Self {
        Self {
            runner: Mutex::new(Box::new(LlamaRuntime::new())),
        }
    }
}

#[tauri::command]
pub fn get_runtime_state(state: State<'_, RuntimeEngine>) -> Result<RuntimeState, String> {
    let runner = state.runner.lock().map_err(|_| "Failed to lock runtime")?;
    Ok(runner.status())
}

#[tauri::command]
pub fn load_model(path: String, state: State<'_, RuntimeEngine>) -> Result<RuntimeState, String> {
    let mut runner = state.runner.lock().map_err(|_| "Failed to lock runtime")?;
    runner.load_model(&path)?;
    Ok(runner.status())
}

#[tauri::command]
pub fn unload_model(state: State<'_, RuntimeEngine>) -> Result<RuntimeState, String> {
    let mut runner = state.runner.lock().map_err(|_| "Failed to lock runtime")?;
    runner.unload_model()?;
    Ok(runner.status())
}
