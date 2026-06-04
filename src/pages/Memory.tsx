import { Search, Database, Clock, Edit2, Trash2 } from "lucide-react";

export default function Memory() {
  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-y-auto">
      <div className="px-8 py-6 border-b border-zinc-900 sticky top-0 bg-zinc-950/80 backdrop-blur z-10">
        <h1 className="text-2xl font-semibold text-zinc-100">Memory Engine</h1>
        <p className="text-sm text-zinc-400 mt-1">Browse and manage semantic, episodic, and long-term memories selectively retrieved during execution.</p>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search memories..."
              className="w-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-md transition font-medium">Semantic</button>
            <button className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 text-sm rounded-md transition font-medium">Episodic</button>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto w-full">
        <div className="space-y-4">

          {/* Memory Item */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 group hover:bg-zinc-900 transition">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <Database className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-zinc-300">Semantic</span>
                    <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Updated 2 hrs ago</span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">User prefers system architecture built primarily in Rust. Tauri is the preferred framework for desktop applications combining Rust backend with React/TypeScript frontend.</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider">
                  <span className="text-zinc-500">Importance:</span>
                  <span className="text-green-400">High (0.92)</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button className="p-1.5 text-zinc-500 hover:text-white bg-zinc-800 rounded transition">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-zinc-500 hover:text-red-400 bg-zinc-800 rounded transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Memory Item */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 group hover:bg-zinc-900 transition">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <Database className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-zinc-300">Episodic</span>
                    <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" /> 1 day ago</span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">Discussed the implementation of the Decision Engine and how it evaluates risk and confidence before executing actions.</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider">
                  <span className="text-zinc-500">Importance:</span>
                  <span className="text-amber-400">Med (0.65)</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button className="p-1.5 text-zinc-500 hover:text-white bg-zinc-800 rounded transition">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-zinc-500 hover:text-red-400 bg-zinc-800 rounded transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
