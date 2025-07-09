import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom"; // Uncomment jika tombol Tambah Proyek diaktifkan

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editing, setEditing] = useState(null); // Gunakan null untuk kondisi yang lebih jelas

  const initialEditState = { id: null, name: "", description: "", deadline: "" };

  // Fungsi untuk mengambil data proyek
  const fetchProjects = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fungsi untuk mengubah status proyek
  const updateStatus = (id, newStatus) => {
    axios.patch(`http://localhost:5000/api/projects/${id}`, { status: newStatus })
      .then(fetchProjects)
      .catch(err => console.error("Update status error:", err));
  };

  // Fungsi untuk menghapus proyek
  const deleteProject = (id) => {
    if (window.confirm("Yakin hapus proyek ini?")) {
      axios.delete(`http://localhost:5000/api/projects/${id}`)
        .then(fetchProjects)
        .catch(err => console.error("Delete error:", err));
    }
  };

  // Fungsi untuk memulai mode edit
  const startEdit = (proj) => {
    setEditing({
      id: proj.id,
      name: proj.name,
      description: proj.description,
      deadline: proj.deadline.split("T")[0], // Format tanggal untuk input type="date"
    });
  };

  // Fungsi untuk menyimpan hasil edit
  const submitEdit = (e) => {
    e.preventDefault();
    const { id, name, description, deadline } = editing;
    
    // Cari status proyek asli sebelum diubah
    const originalProject = projects.find(p => p.id === id);
    if (!originalProject) return; // Jaga-jaga jika proyek tidak ditemukan

    axios.put(`http://localhost:5000/api/projects/${id}`, {
      name,
      description,
      deadline,
      status: originalProject.status // Sertakan status yang ada saat ini
    })
      .then(() => {
        setEditing(null); // Kembali ke null setelah selesai
        fetchProjects();
      })
      .catch(err => console.error("Edit error:", err));
  };

  // Fungsi bantuan untuk style status
  const getStatusStyles = (status) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'pending':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Logika filter dan sort
  const filteredAndSortedProjects = projects
    .filter(p => filterStatus === "all" ? true : p.status === filterStatus)
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.deadline) - new Date(b.deadline)
        : new Date(b.deadline) - new Date(a.deadline)
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">📋 Daftar Proyek</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap items-center gap-4">
          <span className="text-gray-500">Filter:</span>
          {/* INI BAGIAN YANG DIPERBAIKI */}
          <select 
            value={filterStatus} 
            onChange={e => setFilterStatus(e.target.value)} 
            className="p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="ongoing">On Going</option>
            <option value="done">Done</option>
          </select>
          <span className="text-gray-500">Urutkan:</span>
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="asc">Deadline Terdekat</option>
            <option value="desc">Deadline Terjauh</option>
          </select>
        </div>
        {editing && (
          <form onSubmit={submitEdit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-blue-200">
            <h3 className="font-semibold text-xl mb-4 text-gray-700">✏️ Edit Proyek: <span className="text-blue-600">{editing.name}</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text" required placeholder="Nama Proyek"
                value={editing.name}
                onChange={e => setEditing({ ...editing, name: e.target.value })}
                className="p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="date" required
                value={editing.deadline}
                onChange={e => setEditing({ ...editing, deadline: e.target.value })}
                className="p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <textarea
              required placeholder="Deskripsi Proyek"
              value={editing.description}
              onChange={e => setEditing({ ...editing, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md my-4 h-24 focus:ring-2 focus:ring-blue-300"
            />
            <div className="flex gap-3">
              <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition shadow-sm">Simpan Perubahan</button>
              <button type="button" onClick={() => setEditing(null)} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-300 transition">Batal</button>
            </div>
          </form>
        )}
        {loading ? (
          <p className="text-center text-gray-500">⏳ Memuat data proyek...</p>
        ) : filteredAndSortedProjects.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProjects.map(proj => (
              <li key={proj.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 pr-2">{proj.name}</h3>
                    <select
                      value={proj.status}
                      onChange={e => updateStatus(proj.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className={`text-xs px-2 py-1 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-200 ${getStatusStyles(proj.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="ongoing">On Going</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 h-16">{proj.description}</p>
                  <p className="text-gray-400 text-xs flex items-center gap-2">
                    <span className="mr-1">👤</span> Client: {proj.client?.name || "Tidak ada klien"}
                    <span className="mr-1">📅</span> Deadline: {new Date(proj.deadline).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end gap-4">
                  <button onClick={() => startEdit(proj)} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">Edit</button>
                  <button onClick={() => deleteProject(proj.id)} className="text-sm font-medium text-red-600 hover:text-red-800 transition">Hapus</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <p className="text-xl text-gray-500">🚫</p>
            <p className="mt-2 text-gray-500">Tidak ada proyek yang sesuai dengan filter Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;