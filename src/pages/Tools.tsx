import { FileSearch, Terminal, ShieldAlert, CheckCircle2, Globe } from "lucide-react";

export default function Tools() {
  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-y-auto">
      <div className="px-8 py-6 border-b border-zinc-900 sticky top-0 bg-zinc-950/80 backdrop-blur z-10">
        <h1 className="text-2xl font-semibold text-zinc-100">Tool Governance</h1>
        <p className="text-sm text-zinc-400 mt-1">Configure permissions, safety levels, and user approval requirements for runtime tools.</p>
      </div>

      <div className="p-8 max-w-5xl mx-auto w-full">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Tool Card: Local File System */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                <CheckCircle2 className="w-3 h-3" /> Enabled
              </span>
            </div>

            <FileSearch className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-zinc-100 mb-1">Local File System</h3>
            <p className="text-sm text-zinc-400 mb-6 flex-1">Read and write access to permitted directories. Governed by the Verification Layer to prevent destructive actions.</p>

            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 font-medium">Safety Level</span>
                <span className="text-xs font-mono text-amber-400 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Medium</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 font-medium">Requires Approval</span>
                <span className="text-xs text-zinc-300">Write Only</span>
              </div>
              <button className="w-full mt-2 py-2 text-sm bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-300 transition">
                Configure Permissions
              </button>
            </div>
          </div>

          {/* Tool Card: Web Search */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                <CheckCircle2 className="w-3 h-3" /> Enabled
              </span>
            </div>

            <Globe className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-medium text-zinc-100 mb-1">Web Search</h3>
            <p className="text-sm text-zinc-400 mb-6 flex-1">Allows the runtime to query external search engines to augment local knowledge and verify claims.</p>

            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 font-medium">Safety Level</span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Low</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 font-medium">Requires Approval</span>
                <span className="text-xs text-zinc-300">Never</span>
              </div>
              <button className="w-full mt-2 py-2 text-sm bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-300 transition">
                Configure Providers
              </button>
            </div>
          </div>

          {/* Tool Card: Terminal Execution */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col relative overflow-hidden opacity-75">
            <div className="absolute top-0 right-0 p-4">
               <span className="flex items-center gap-1 text-xs font-semibold text-zinc-500 bg-zinc-800 px-2 py-1 rounded border border-zinc-700">
                Disabled
              </span>
            </div>

            <Terminal className="w-8 h-8 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-zinc-100 mb-1">Terminal Execution</h3>
            <p className="text-sm text-zinc-400 mb-6 flex-1">Execute raw bash/powershell commands on the host machine. Highly dangerous.</p>

            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 font-medium">Safety Level</span>
                <span className="text-xs font-mono text-red-400 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Critical</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 font-medium">Requires Approval</span>
                <span className="text-xs text-zinc-300">Always</span>
              </div>
              <button className="w-full mt-2 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition">
                Enable Tool
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
