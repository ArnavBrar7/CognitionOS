# CognitionOS

### The Cognitive Runtime for Local AI

CognitionOS is an open-source cognitive runtime that transforms local LLMs into memory-capable, transparent, and decision-aware AI systems.

Instead of modifying model weights, CognitionOS operates as a runtime layer that enhances supported models with:

* Persistent Memory
* Decision Reasoning
* Verification Pipelines
* Constitutional Behavior
* Cognitive Tracing
* Tool Governance

CognitionOS combines:

* Local Models (GGUF via native CLI)
* CognitionOS Runtime

to create a local-first intelligence platform.

---

## Architecture

User
↓
CognitionOS UI
↓
CognitionOS Runtime

* Memory Engine
* Decision Engine
* Verification Engine
* Constitution Engine
* Tool Governance Engine

↓

Local Model Runtime

* `llama-cli` GGUF Invocation

---

## Features

### Memory

* Episodic Memory
* Semantic Memory
* Persistent Storage (JSON-backed)
* Memory Search
* Memory Deletion

### Decision Engine

* Risk Assessment (Heuristic Evaluation)
* Confidence Analysis
* Clarification Requests

### Verification

* Contradiction Detection
* Hallucination Reduction via Structural Confidence Checks

### Model Management

* Local GGUF Path execution mapping

### Cognitive Trace

Optional transparency layer showing:

* Goal Detection
* Risk Score
* Confidence Score
* Tools Used
* Runtime Decisions

Without exposing chain-of-thought.

---

# Installation

## Run Development Mode

Ensure you have Rust, Node.js, and a valid GGUF model binary configured.

```bash
npm install
npm run dev
```

---

## Build Production Application

Creates a native installer for the current operating system.

```bash
npm run build
```

Generated output:

Windows
```text
src-tauri/target/release/bundle/msi/
```

macOS
```text
src-tauri/target/release/bundle/dmg/
```

---

# Philosophy

Architecture over Prompting.

CognitionOS focuses on building systems rather than relying on increasingly large prompts.

The runtime is responsible for:

* Memory
* Verification
* Risk Assessment
* Transparency
* Governance

while preserving the strengths of the underlying model.

---

# Contributing

Contributions are welcome.

See:

* CONTRIBUTING.md
* DEVELOPMENT.md
* ARCHITECTURE.md
* SDK.md

for details.

---

# License

MIT License.
