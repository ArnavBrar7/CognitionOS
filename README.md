# CognitionOS

**The Cognitive Runtime for Local AI**

CognitionOS is an open-source cognitive runtime for local LLMs that adds long-term memory, uncertainty awareness, decision reasoning, tool governance, and agent capabilities while preserving over 97% of the base model's performance.

It is a behavioral operating layer and intelligence infrastructure platform, prioritizing architecture over prompting to deliver reliability, transparency, consistency, and reasoning quality.

## Features

- **Memory Engine**: Long-term, episodic, and semantic memory with selective retrieval.
- **Decision Engine**: Pre-execution action evaluation (risk, confidence, intent).
- **Uncertainty Engine**: Explicit uncertainty handling to reduce hallucination.
- **Verification Layer**: Reduces contradictions and unsupported claims before final response.
- **Constitution Layer**: Configurable behavioral framework guiding decisions based on honesty, transparency, and harm reduction.
- **Agent Framework**: Multi-step execution, reflection, and state management.
- **Tool Governance**: Granular permissions and safety levels for files, search, notes, and plugins.

## Architecture

CognitionOS utilizes a multi-layered runtime architecture:

`User → Request Router → Memory Engine → Decision Engine → Constitution Layer → Tool Governance Layer → Verification Layer → Model Runtime → Response Evaluation → User`

For detailed architecture, see [docs/architecture.md](docs/architecture.md).

## Installation

### Prerequisites

- Node.js (v18+)
- Rust (latest stable)
- Tauri dependencies (`webkit2gtk`, `rsvg2` on Linux)

### Building from Source

```bash
git clone https://github.com/cognitionos/cognitionos.git
cd cognitionos
npm install
npm run tauri dev
```

## Contributing

We welcome contributions! Please review our [Contributing Guide](docs/contributing.md) for details on our development process, how to propose bugfixes and improvements, and how to build and test your changes.

## Benchmarks

We maintain a rigorous benchmarking suite to compare the Base Model vs the CognitionOS Runtime. See [docs/benchmarks.md](docs/benchmarks.md) for the latest data on hallucination rates, consistency, memory recall, and task completion.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
