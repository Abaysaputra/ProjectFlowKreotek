import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Halaman
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import ProjectTasks from "./pages/ProjectTasks";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="min-h-screen flex bg-gray-50 text-gray-800 font-inter">
        <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/add" element={<AddProject />} />
              <Route path="/projects/:projectId/tasks" element={<ProjectTasks />} />
              {/* Tambahkan rute lainnya sesuai kebutuhan */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
