import { NavLink } from "react-router-dom";
import { MessageSquare, Cpu, Database, Network, Wrench, Settings } from "lucide-react";
import { useAppStore } from "../store";

const navItems = [
  { path: "/chat", label: "Chat", icon: MessageSquare },
  { path: "/models", label: "Models", icon: Cpu },
  { path: "/memory", label: "Memory", icon: Database },
  { path: "/agents", label: "Agents", icon: Network },
  { path: "/tools", label: "Tools", icon: Wrench },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  if (!sidebarOpen) return null;

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col flex-shrink-0 h-full">
      <div className="p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-sm font-black text-white">C</span>
          </div>
          CognitionOS
        </h1>
        <p className="text-xs text-zinc-500 mt-1">Cognitive Runtime</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800 text-xs text-zinc-500">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Runtime Active
        </div>
      </div>
    </div>
  );
}
