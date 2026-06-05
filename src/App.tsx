import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Chat from "./pages/Chat";
import Models from "./pages/Models";
import Memory from "./pages/Memory";
import Agents from "./pages/Agents";
import Tools from "./pages/Tools";
import Settings from "./pages/Settings";
import Setup from "./pages/Setup";
import { useAppStore } from "./store";

function App() {
  const isSetupComplete = useAppStore(state => state.isSetupComplete);

  if (!isSetupComplete) {
    return <Setup />;
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/chat" replace />} />
        <Route path="chat" element={<Chat />} />
        <Route path="models" element={<Models />} />
        <Route path="memory" element={<Memory />} />
        <Route path="agents" element={<Agents />} />
        <Route path="tools" element={<Tools />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
