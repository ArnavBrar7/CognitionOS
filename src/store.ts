import { create } from 'zustand';

interface AppState {
  currentModel: string | null;
  setCurrentModel: (model: string | null) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentModel: 'llama-3-8b.gguf',
  setCurrentModel: (model) => set({ currentModel: model }),
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
