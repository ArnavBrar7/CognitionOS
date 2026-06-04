# Contributing to CognitionOS

Thank you for your interest in contributing to CognitionOS! We aim to build a serious, production-grade open-source project.

## Development Environment

1.  Ensure you have Rust, Node.js, and Tauri dependencies installed.
2.  Fork the repository and clone your fork.
3.  Run `npm install` to install frontend dependencies.
4.  Run `npm run tauri dev` to start the development server and application.

## Code Standards

-   **Rust**: Follow idiomatic Rust practices. Run `cargo fmt` and `cargo clippy`. Ensure all new modules have appropriate unit tests.
-   **TypeScript/React**: Use strong typing. Avoid `any`. Follow the established project structure and Tailwind styling conventions.
-   **Architecture over Prompting**: When proposing a new feature, prioritize building a system or layer rather than relying on a complex prompt.

## Pull Requests

1.  Create a descriptive branch name.
2.  Ensure your code passes all checks (`cargo check`, `cargo test`, `npm run build`).
3.  Write clear, concise commit messages.
4.  Submit a PR with a detailed description of the changes and their architectural impact.
