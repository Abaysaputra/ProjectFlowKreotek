    import { useState } from "react";
    import axios from "axios";

    const AddClient = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post("http://localhost:5000/api/clients", form);
        alert("✅ Klien berhasil ditambahkan!");
        setForm({ name: "", email: "", password: "" });
        } catch (err) {
        console.error("❌ Gagal menambahkan klien:", err.response?.data || err.message);
        alert("❌ Gagal menambahkan klien.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">➕ Tambah Klien</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border p-2 rounded-md"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border p-2 rounded-md"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border p-2 rounded-md"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
            Simpan
            </button>
        </form>
        </div>
    );
    };

    export default AddClient;
