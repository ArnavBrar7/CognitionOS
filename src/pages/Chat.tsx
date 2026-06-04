import { Send, FileUp, Sparkles, Brain } from "lucide-react";

export default function Chat() {
  return (
    <div className="flex h-full bg-zinc-950">
      {/* Thread Sidebar */}
      <div className="w-64 border-r border-zinc-800 flex flex-col bg-zinc-900/50 hidden md:flex">
        <div className="p-4 border-b border-zinc-800">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition text-sm font-medium">
            <Sparkles className="w-4 h-4" /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="px-2 py-1 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Today</div>
          <button className="w-full text-left px-3 py-2 text-sm text-zinc-300 bg-zinc-800/80 rounded-md truncate">
            Rust System Architecture
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300 rounded-md truncate transition">
            Memory Engine Design
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-14 border-b border-zinc-800 flex items-center px-6 justify-between shrink-0 bg-zinc-950">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-zinc-100">Rust System Architecture</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">Llama 3 8B</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Brain className="w-4 h-4" />
            <span className="text-xs">Cognitive Layer Active</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex gap-4 max-w-3xl mx-auto w-full">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">U</div>
            <div className="flex-1 pt-1">
              <p className="text-zinc-300 text-sm leading-relaxed">How should I structure the routing layer for the new memory engine in Rust?</p>
            </div>
          </div>

          <div className="flex gap-4 max-w-3xl mx-auto w-full">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <div className="flex-1 pt-1 space-y-4">
              {/* Cognitive Trace */}
              <div className="flex flex-col gap-1 p-3 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Brain className="w-3 h-3" /> Runtime Trace
                </div>
                <div>→ Retrieving relevant architecture constraints from Memory Engine...</div>
                <div>→ Found 2 relevant semantic memories.</div>
                <div>→ Evaluating approach via Decision Engine (Risk: Low).</div>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed">
                Based on your previous preferences for modular design and the Tauri architecture, you should structure the routing layer using Tauri commands that delegate to a dedicated `router.rs` module. This module will act as the entry point for all cognitive requests before passing them to the memory engine.
              </p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-950 shrink-0 border-t border-zinc-900">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-zinc-900 border border-zinc-800 p-2 rounded-xl focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
            <button className="p-2 text-zinc-400 hover:text-zinc-200 transition shrink-0">
              <FileUp className="w-5 h-5" />
            </button>
            <textarea
              placeholder="Message CognitionOS..."
              className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 resize-none max-h-32 min-h-[40px] py-2 focus:outline-none"
              rows={1}
            />
            <button className="p-2 bg-white text-black hover:bg-zinc-200 rounded-lg transition shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-zinc-500">CognitionOS evaluates inputs before execution. Hallucinations are monitored.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
