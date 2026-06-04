import { Save, Scale, Zap } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-y-auto">
      <div className="px-8 py-6 border-b border-zinc-900 sticky top-0 bg-zinc-950/80 backdrop-blur z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Constitution & Settings</h1>
          <p className="text-sm text-zinc-400 mt-1">Configure the behavioral framework and system-wide settings.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition text-sm font-medium">
          <Save className="w-4 h-4" /> Save Configuration
        </button>
      </div>

      <div className="p-8 max-w-4xl mx-auto w-full space-y-8">

        {/* Constitution Layer */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-medium text-zinc-100">Constitution Layer Defaults</h2>
          </div>
          <p className="text-sm text-zinc-400 mb-6">These weights guide the Decision Engine during execution. They determine how the model prioritizes competing objectives.</p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-zinc-200">Honesty & Transparency</label>
                <span className="text-xs font-mono text-zinc-500">1.0</span>
              </div>
              <input type="range" min="0" max="1" step="0.1" defaultValue="1.0" className="w-full accent-blue-500" />
              <p className="text-xs text-zinc-500 mt-1">Prioritize factual accuracy over sycophancy. Explicitly state uncertainty.</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-zinc-200">Harm Reduction</label>
                <span className="text-xs font-mono text-zinc-500">1.0</span>
              </div>
              <input type="range" min="0" max="1" step="0.1" defaultValue="1.0" className="w-full accent-blue-500" />
              <p className="text-xs text-zinc-500 mt-1">Refuse execution of tools or commands that risk system destruction or unauthorized data access.</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-zinc-200">User Benefit</label>
                <span className="text-xs font-mono text-zinc-500">0.9</span>
              </div>
              <input type="range" min="0" max="1" step="0.1" defaultValue="0.9" className="w-full accent-blue-500" />
              <p className="text-xs text-zinc-500 mt-1">Attempt to fulfill user requests efficiently without excessive clarifying questions if risk is low.</p>
            </div>

          </div>
        </section>

        {/* Runtime Performance */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-medium text-zinc-100">Runtime Performance</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-zinc-200">Verification Frequency</h3>
                <p className="text-xs text-zinc-500">How often the Verification Layer intercepts responses.</p>
              </div>
              <select className="bg-zinc-950 border border-zinc-800 text-sm text-zinc-300 rounded px-3 py-1.5 focus:outline-none">
                <option>Always (Safest, Slower)</option>
                <option selected>Adaptive (Recommended)</option>
                <option>Minimal (Fastest)</option>
              </select>
            </div>

            <div className="h-px bg-zinc-800 w-full my-4"></div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-zinc-200">Memory Retrieval Top-K</h3>
                <p className="text-xs text-zinc-500">Maximum number of memories injected into context per request.</p>
              </div>
              <input type="number" defaultValue={5} className="bg-zinc-950 border border-zinc-800 text-sm text-zinc-300 rounded px-3 py-1.5 w-20 text-center focus:outline-none" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
