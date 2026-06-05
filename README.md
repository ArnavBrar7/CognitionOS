# CognitionOS

### The Cognitive Runtime for Local AI

CognitionOS is an open-source cognitive runtime that transforms local LLMs into memory-capable, agentic, transparent, and decision-aware AI systems.

Instead of modifying model weights, CognitionOS operates as a runtime layer that enhances supported models with:

* Long-term Memory
* Decision Reasoning
* Uncertainty Awareness
* Verification Pipelines
* Tool Governance
* Agent Execution
* Constitutional Behavior
* Cognitive Tracing

CognitionOS combines:

* Local Models (GGUF)
* llama.cpp
* Hermes Agent
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
* Uncertainty Engine
* Constitution Engine
* Tool Governance Engine

↓

Hermes Agent

* Planning
* Reflection
* Tool Orchestration
* State Tracking

↓

Local Model Runtime

* llama.cpp
* GGUF Models
* GPU Acceleration
* CPU Fallback

---

## Features

### Memory

* Episodic Memory
* Semantic Memory
* Preference Memory
* Project Memory
* Persistent Storage
* Memory Search
* Memory Editing

### Decision Engine

* Risk Assessment
* Confidence Analysis
* Missing Information Detection
* Clarification Requests
* Confirmation Workflows

### Verification

* Contradiction Detection
* Response Validation
* Tool Validation
* Hallucination Reduction

### Agent System

* Planning
* Reflection
* Multi-Step Execution
* Tool Usage
* State Tracking

### Model Management

* Ollama Discovery
* Model Downloads
* Download Resume
* Metadata Management
* Storage Management

### Cognitive Trace

Optional transparency layer showing:

* Goal Detection
* Risk Score
* Confidence Score
* Memory Usage
* Tool Usage
* Runtime Decisions

Without exposing chain-of-thought.

---

# Installation

## One Command Setup

Installs dependencies, runtime assets, llama.cpp integration, Hermes Agent integration, builds the desktop application, and prepares CognitionOS for first launch.

```bash
npm run setup
```

---

## Run Development Mode

```bash
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

# First Launch Experience

On first launch CognitionOS automatically:

* Verifies runtime dependencies
* Verifies llama.cpp
* Verifies Hermes Agent
* Checks model availability
* Creates runtime directories
* Initializes memory systems

No repeated setup required.

---

# Supported Models

* Hermes
* Qwen
* Llama
* DeepSeek
* Gemma
* Mistral

Through the CognitionOS Model Abstraction Layer.

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