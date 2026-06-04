import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Search, Database, Clock, Trash2 } from "lucide-react";

interface Memory {
  id: string;
  content: string;
  memory_type: string;
  importance: number;
  created_at: string;
}

export default function Memory() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [query, setQuery] = useState("");

  const fetchMemories = async (searchQuery = "") => {
    try {
      const results = await invoke<Memory[]>("retrieve_memories", { query: searchQuery });
      setMemories(results);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await invoke("delete_memory", { id });
      fetchMemories(query);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    fetchMemories(e.target.value);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-y-auto">
      <div className="px-8 py-6 border-b border-zinc-900 sticky top-0 bg-zinc-950/80 backdrop-blur z-10">
        <h1 className="text-2xl font-semibold text-zinc-100">Memory Engine</h1>
        <p className="text-sm text-zinc-400 mt-1">Browse and manage semantic and episodic memories stored by the runtime.</p>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search persistent memories..."
              className="w-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto w-full">
        <div className="space-y-4">
          {memories.length === 0 && (
            <div className="text-center py-12 text-zinc-500 text-sm">
              No memories found. Start chatting to build the memory index.
            </div>
          )}

          {memories.map((mem) => (
            <div key={mem.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 group hover:bg-zinc-900 transition">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <Database className={`w-5 h-5 shrink-0 mt-0.5 ${mem.memory_type === 'semantic' ? 'text-blue-500' : 'text-purple-500'}`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-zinc-300 capitalize">{mem.memory_type}</span>
                      <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                      <span className="text-xs text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(mem.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-zinc-200 leading-relaxed">{mem.content}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider">
                    <span className="text-zinc-500">Importance:</span>
                    <span className={mem.importance > 0.8 ? "text-green-400" : "text-amber-400"}>
                      {mem.importance.toFixed(2)}
                    </span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button onClick={() => handleDelete(mem.id)} className="p-1.5 text-zinc-500 hover:text-red-400 bg-zinc-800 rounded transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
