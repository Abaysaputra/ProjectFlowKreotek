import { useEffect, useState } from "react";
import axios from "axios";


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Gagal fetch data project:", err);
        setLoading(false);
      });
  }, []);
  
  // Filter & Sort
  let filtered = [...projects];
  if (filterStatus !== "all") {
    filtered = filtered.filter(p => p.status === filterStatus);
  }
  filtered.sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.deadline) - new Date(b.deadline)
      : new Date(b.deadline) - new Date(a.deadline);
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 Daftar Proyek</h2>

        {/* Filter & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-4">
            <select onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 rounded border border-gray-300 bg-white shadow-sm">
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="ongoing">On Going</option>
              <option value="done">Done</option>
            </select>

            <select onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 rounded border border-gray-300 bg-white shadow-sm">
              <option value="asc">Deadline ↑</option>
              <option value="desc">Deadline ↓</option>
            </select>
          </div>
        </div>
        {/* Tambah Project */}
        
        {/* Project List */}
        {loading ? (
          <p className="text-gray-600">⏳ Memuat data...</p>
        ) : filtered.length > 0 ? (
          <ul className="grid sm:grid-cols-2 gap-6">
            {filtered.map((project) => (
              <li key={project.id} className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 p-5 border-l-4 border-blue-500">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded 
                    ${project.status === "done" ? "bg-green-100 text-green-700" : 
                      project.status === "ongoing" ? "bg-yellow-100 text-yellow-700" : 
                      "bg-gray-100 text-gray-600"}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{project.description}</p>
                <p className="text-sm text-gray-400">📅 Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">🚫 Tidak ada data proyek sesuai filter.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
