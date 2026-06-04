import { Download, Play, Settings2, Trash2, HardDrive, AlertCircle } from "lucide-react";

export default function Models() {
  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-y-auto">
      <div className="px-8 py-6 border-b border-zinc-900 flex justify-between items-center sticky top-0 bg-zinc-950/80 backdrop-blur z-10">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Models</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage local GGUF models and runtime configurations.</p>
        </div>
        <button className="flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 px-4 py-2 rounded-md transition text-sm font-medium">
          <Download className="w-4 h-4" /> Load Model
        </button>
      </div>

      <div className="p-8 max-w-5xl mx-auto w-full space-y-8">

        {/* Active Model Status */}
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Currently Loaded</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-start gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

            <div className="w-16 h-16 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center shrink-0">
              <HardDrive className="w-6 h-6 text-blue-500 mb-1" />
              <span className="text-[10px] font-mono text-zinc-500">Q4_K_M</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium text-zinc-100">Meta-Llama-3-8B-Instruct.Q4_K_M.gguf</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20">Running</span>
              </div>
              <p className="text-sm text-zinc-400 max-w-xl mb-4">
                Provides a strong baseline for the CognitionOS runtime. 97.4% capability preservation measured in latest benchmarks.
              </p>

              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800">
                  <span className="text-zinc-500">Context:</span> 8192
                </div>
                <div className="flex items-center gap-1.5 text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800">
                  <span className="text-zinc-500">Threads:</span> 8
                </div>
                <div className="flex items-center gap-1.5 text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800">
                  <span className="text-zinc-500">GPU Layers:</span> 33/33
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-2 text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800 rounded-md transition tooltip" title="Configure">
                <Settings2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Available Models */}
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Local Library</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model Card */}
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 hover:bg-zinc-900 transition flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-zinc-500" />
                  <h3 className="font-medium text-zinc-200 text-sm truncate">Mistral-7B-Instruct-v0.2.Q5_K_M.gguf</h3>
                </div>
              </div>
              <div className="text-xs text-zinc-500 font-mono mb-4">Size: 5.14 GB • Quant: Q5_K_M</div>
              <div className="mt-auto flex justify-between items-center pt-4 border-t border-zinc-800/50">
                <button className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition">
                  <Play className="w-3.5 h-3.5" /> Start Runtime
                </button>
                <button className="text-zinc-500 hover:text-red-400 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Warning Card for unsupported */}
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-5 flex flex-col opacity-75">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <h3 className="font-medium text-zinc-400 text-sm truncate">phi-2.Q4_K_M.gguf</h3>
                </div>
              </div>
              <div className="text-xs text-zinc-500 mb-4">Architecture currently unsupported by CognitionOS Memory Engine.</div>
              <div className="mt-auto flex justify-end pt-4 border-t border-zinc-800/30">
                <button className="text-zinc-600 hover:text-red-400 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
