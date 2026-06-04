# Architecture

CognitionOS is designed with a multi-layered modular architecture, built primarily in Rust for the backend and React/TypeScript for the frontend application (via Tauri).

## Core Pipeline

1.  **Request Router**: Receives the initial prompt/request and delegates to the appropriate subsystem.
2.  **Memory Engine**: Selectively retrieves relevant long-term, semantic, and episodic memories without overflowing context windows.
3.  **Decision Engine**: Evaluates user intent, potential risks, and required actions before execution.
4.  **Constitution Layer**: Applies configurable behavioral frameworks (e.g., honesty, user benefit) to guide decisions.
5.  **Tool Governance Layer**: Determines if requested tools are permitted, safe, and require user confirmation.
6.  **Verification Layer**: Intercepts claims and verifies them against context to reduce hallucinations.
7.  **Model Runtime**: The core execution engine interfacing with the local model (e.g., GGUF via llama.rs).
8.  **Response Evaluation**: Final check of the generated response before it is sent back to the user.

Each layer is independently configurable and designed to be easily extensible.
