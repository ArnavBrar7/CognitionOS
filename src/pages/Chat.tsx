import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Send, Sparkles, Brain, Loader2 } from "lucide-react";

interface Decision {
  intent: string;
  action: string;
  risk_level: number;
  confidence: number;
  proceed: boolean;
  outcome_state: string;
  reasoning: string;
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [trace, setTrace] = useState<Decision | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      // Create an episodic memory of the user's intent
      await invoke("create_memory", {
        content: `User requested: ${input}`,
        memoryType: "episodic",
        importance: 0.5
      });

      // Evaluate the request through the decision engine
      const decision = await invoke<Decision>("evaluate_action", {
        intent: input,
        proposedAction: input // In reality, an agent plans the action
      });

      setTrace(decision);

      // Simulate processing time
      setTimeout(() => setLoading(false), 800);

    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full bg-zinc-950">
      {/* Thread Sidebar */}
      <div className="w-64 border-r border-zinc-800 flex flex-col bg-zinc-900/50 hidden md:flex">
        <div className="p-4 border-b border-zinc-800">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition text-sm font-medium">
            <Sparkles className="w-4 h-4" /> New Chat
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-14 border-b border-zinc-800 flex items-center px-6 justify-between shrink-0 bg-zinc-950">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-zinc-100">Live Session</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">Llama 3</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Brain className="w-4 h-4" />
            <span className="text-xs">CognitionOS Active</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {trace && (
            <div className="flex gap-4 max-w-3xl mx-auto w-full">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              <div className="flex-1 pt-1 space-y-4">

                {/* Cognitive Trace Panel */}
                <div className="flex flex-col gap-2 p-4 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-2 text-zinc-300 font-semibold mb-2 border-b border-zinc-800 pb-2">
                    <Brain className="w-4 h-4 text-purple-500" /> Cognitive Trace
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-zinc-500 block mb-1">Goal / Intent</span>
                      <span className="text-zinc-300">{trace.intent}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">Confidence</span>
                      <span className="text-green-400">{(trace.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">Assessed Risk</span>
                      <span className={trace.risk_level > 0.5 ? "text-red-400" : "text-emerald-400"}>
                        {(trace.risk_level * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">Decision</span>
                      <span className={trace.proceed ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                        {trace.outcome_state.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-zinc-800/50">
                    <span className="text-zinc-500 block mb-1">Engine Reasoning</span>
                    <span className="text-zinc-400 italic">"{trace.reasoning}"</span>
                  </div>
                </div>

                {trace.proceed ? (
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    I have evaluated your request and determined it is safe to proceed. I have logged this to the persistent Memory Engine.
                  </p>
                ) : (
                  <p className="text-amber-400 text-sm leading-relaxed">
                    Execution halted by the Constitution Engine. Reason: {trace.reasoning}
                  </p>
                )}

              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-950 shrink-0 border-t border-zinc-900">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-zinc-900 border border-zinc-800 p-2 rounded-xl focus-within:border-blue-500/50 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message CognitionOS..."
              className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 resize-none max-h-32 min-h-[40px] py-2 px-2 focus:outline-none"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 bg-white text-black hover:bg-zinc-200 disabled:opacity-50 rounded-lg transition shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
