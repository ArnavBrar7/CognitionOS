use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum SafetyLevel {
    Low,
    Medium,
    High,
    Critical,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ToolPermission {
    pub tool_name: String,
    pub safety_level: SafetyLevel,
    pub is_enabled: bool,
    pub requires_user_approval: bool,
}

pub struct ToolGovernanceEngine {
    // We avoid global locking here for simplicity, but in production
    // this would read from user-configured preferences.
}

#[tauri::command]
pub fn check_tool_permission(tool_name: String) -> Result<ToolPermission, String> {
    // Map tool strings to actual capabilities and risk profiles
    match tool_name.as_str() {
        "web_search" => Ok(ToolPermission {
            tool_name,
            safety_level: SafetyLevel::Low,
            is_enabled: true,
            requires_user_approval: false,
        }),
        "local_file_read" => Ok(ToolPermission {
            tool_name,
            safety_level: SafetyLevel::Medium,
            is_enabled: true,
            requires_user_approval: false,
        }),
        "local_file_write" => Ok(ToolPermission {
            tool_name,
            safety_level: SafetyLevel::High,
            is_enabled: true,
            requires_user_approval: true,
        }),
        "terminal_execution" => Ok(ToolPermission {
            tool_name,
            safety_level: SafetyLevel::Critical,
            is_enabled: false,
            requires_user_approval: true, // Always require if ever enabled
        }),
        _ => Err(format!("Unknown tool requested: {}", tool_name)),
    }
}
