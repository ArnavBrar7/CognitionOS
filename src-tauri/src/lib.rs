pub mod constitution;
pub mod decision;
pub mod memory;
pub mod router;
pub mod runtime;
pub mod tools;
pub mod verification;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            router::route_request,
            memory::retrieve_memories,
            decision::evaluate_action,
            constitution::get_constitution,
            tools::check_tool_permission,
            verification::verify_claim,
            runtime::get_runtime_state
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
