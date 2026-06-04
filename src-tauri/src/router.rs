use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct RouteRequest {
    pub query: String,
    pub source: String,
}

#[tauri::command]
pub fn route_request(request: RouteRequest) -> Result<String, String> {
    // Stub implementation
    Ok(format!("Routed request: {}", request.query))
}
