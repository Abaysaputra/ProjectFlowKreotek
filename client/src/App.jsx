import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import AddClient from "./pages/AddClient";
import ProjectTasks from "./pages/ProjectTasks";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// Komponen Layout Utama
function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    // TAMBAHKAN text-gray-800 DI SINI
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Root App (yang mengatur semua routing)
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rute untuk Login (di luar layout utama) */}
          <Route path="/login" element={<Login />} />

          {/* Grup Rute yang Dilindungi (semuanya menggunakan AppLayout) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Rute anak ini akan dirender di dalam <Outlet> milik AppLayout */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/add" element={<AddProject />} />
            <Route path="projects/:projectId/tasks" element={<ProjectTasks />} />
            <Route path="clients/add" element={<AddClient />} />
          </Route>

          {/* Rute fallback jika URL tidak ditemukan, arahkan ke login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;