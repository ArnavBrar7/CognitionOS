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
        .manage(memory::MemoryEngine::new())
        .manage(runtime::RuntimeEngine::new())
        .manage(constitution::ConstitutionEngine::new())
        .invoke_handler(tauri::generate_handler![
            router::route_request,
            memory::retrieve_memories,
            memory::create_memory,
            memory::delete_memory,
            decision::evaluate_action,
            constitution::get_constitution,
            constitution::update_constitution_rule,
            tools::check_tool_permission,
            verification::verify_claim,
            runtime::get_runtime_state,
            runtime::load_model,
            runtime::unload_model,
            runtime::download_runtime_binary
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
