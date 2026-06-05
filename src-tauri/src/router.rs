use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct RouteRequest {
    pub query: String,
    pub source: String,
}

use tauri::State;

#[derive(Debug, Serialize, Deserialize)]
pub struct RoutedResponse {
    pub decision: crate::decision::Decision,
    pub memories: Vec<crate::memory::Memory>,
}

#[tauri::command]
pub fn route_request(
    request: RouteRequest,
    memory_engine: State<'_, crate::memory::MemoryEngine>,
) -> Result<RoutedResponse, String> {
    // 1. Memory Engine: Retrieve relevant memories context
    let memories = crate::memory::retrieve_memories(request.query.clone(), memory_engine)?;

    // 2. Decision Engine: Evaluate intent and risk
    let decision = crate::decision::evaluate_action(request.query.clone(), request.query)?;

    // 3. (Future) verification and generation layers hook here.

    Ok(RoutedResponse { decision, memories })
}
