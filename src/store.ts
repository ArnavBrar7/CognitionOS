import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  trace?: any;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
}

interface AppState {
  currentModel: string | null;
  setCurrentModel: (model: string | null) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  conversations: Conversation[];
  activeConversationId: string | null;
  createConversation: (title?: string) => void;
  setActiveConversation: (id: string) => void;
  addMessageToActive: (message: ChatMessage) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentModel: 'llama-3-8b.gguf',
  setCurrentModel: (model) => set({ currentModel: model }),
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  conversations: [
    {
      id: "1",
      title: "Rust System Architecture",
      messages: [],
      updatedAt: Date.now()
    }
  ],
  activeConversationId: "1",

  createConversation: (title = "New Chat") => set((state) => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title,
      messages: [],
      updatedAt: Date.now()
    };
    return {
      conversations: [newConv, ...state.conversations],
      activeConversationId: newConv.id
    };
  }),

  setActiveConversation: (id) => set({ activeConversationId: id }),

  addMessageToActive: (message) => set((state) => {
    const { activeConversationId, conversations } = state;
    if (!activeConversationId) return state;

    return {
      conversations: conversations.map(c =>
        c.id === activeConversationId
          ? { ...c, messages: [...c.messages, message], updatedAt: Date.now() }
          : c
      )
    };
  })
}));
