import { useState, useEffect } from "react";
import axios from "axios";

const AddProject = () => {
  const [form, setForm] = useState({
    name: "",
    client_id: "",
    status: "pending",
    deadline: "",
    description: "",
  });

  const [clients, setClients] = useState([]);

  // Ambil data client saat komponen dimuat
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Gagal mengambil data klien:", error);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/projects", {
        ...form,
        client_id: parseInt(form.client_id),
      });
      alert("✅ Project berhasil ditambahkan!");
      setForm({
        name: "",
        client_id: "",
        status: "pending",
        deadline: "",
        description: "",
      });
    } catch (err) {
      console.error("❌ Gagal menambahkan project:", err.response?.data || err.message);
      alert("❌ Gagal menambahkan project.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">➕ Tambah Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Proyek</label>
          <input name="name" value={form.name} onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Klien</label>
          <select name="client_id" value={form.client_id} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" required>
            <option value="">-- Pilih Klien --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" value={form.status} onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md">
            <option value="pending">Pending</option>
            <option value="ongoing">On Going</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input type="date" name="deadline" value={form.deadline} onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea name="description" value={form.description} onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">Simpan</button>
      </form>
    </div>
  );
};

export default AddProject;
