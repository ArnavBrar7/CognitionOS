import { Activity, Plus, PlayCircle, Clock, AlertTriangle } from "lucide-react";

export default function Agents() {
  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-y-auto">
      <div className="px-8 py-6 border-b border-zinc-900 sticky top-0 bg-zinc-950/80 backdrop-blur z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Agent Framework</h1>
          <p className="text-sm text-zinc-400 mt-1">Monitor multi-step executions, reflection loops, and background tasks.</p>
        </div>
        <button className="flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 px-4 py-2 rounded-md transition text-sm font-medium">
          <Plus className="w-4 h-4" /> New Agent Task
        </button>
      </div>

      <div className="p-8 max-w-5xl mx-auto w-full">

        {/* Active Tasks Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2 text-zinc-400">
              <Activity className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-medium text-zinc-200">Active Tasks</h3>
            </div>
            <p className="text-3xl font-light text-zinc-100">1</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2 text-zinc-400">
              <Clock className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-medium text-zinc-200">Completed (24h)</h3>
            </div>
            <p className="text-3xl font-light text-zinc-100">14</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2 text-zinc-400">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-medium text-zinc-200">Awaiting Input</h3>
            </div>
            <p className="text-3xl font-light text-zinc-100">0</p>
          </div>
        </div>

        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Task Monitor</h2>

        {/* Task List */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

          {/* Active Task */}
          <div className="p-6 border-b border-zinc-800 flex flex-col gap-4 bg-zinc-900/80">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium text-zinc-100 flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-blue-500 animate-pulse" />
                  Analyze Codebase & Generate Rust Bindings
                </h3>
                <p className="text-sm text-zinc-400 mt-1">Processing file: src/router.rs (Step 4 of 12)</p>
              </div>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded border border-blue-500/20">Running</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-950 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '33%' }}></div>
            </div>

            <div className="flex gap-4 text-xs font-mono text-zinc-500 mt-2">
              <span>Tools used: Local File System, Terminal (Read)</span>
              <span>Memory Ops: 4 Writes</span>
            </div>
          </div>

          {/* Completed Task */}
          <div className="p-6 flex flex-col gap-2 bg-zinc-950/50 opacity-75">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium text-zinc-300">Summarize Architecture Docs</h3>
                <p className="text-sm text-zinc-500 mt-1">Completed in 45s</p>
              </div>
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-medium rounded border border-emerald-500/20">Completed</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
