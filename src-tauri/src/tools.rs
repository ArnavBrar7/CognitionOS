use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ToolPermission {
    pub tool_name: String,
    pub is_allowed: bool,
    pub requires_confirmation: bool,
}

#[tauri::command]
pub fn check_tool_permission(tool_name: String) -> Result<ToolPermission, String> {
    Ok(ToolPermission {
        tool_name,
        is_allowed: true,
        requires_confirmation: false,
    })
}
