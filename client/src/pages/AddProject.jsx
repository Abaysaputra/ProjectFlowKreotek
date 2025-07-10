import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition, // Import Transition untuk animasi
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const AddProject = () => {
  const [form, setForm] = useState({
    name: "",
    client_id: "",
    status: "pending",
    deadline: "",
    description: "",
  });

  const [clients, setClients] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientRes, memberRes] = await Promise.all([
          axios.get("http://localhost:5000/api/clients"),
          axios.get("http://localhost:5000/api/users"),
        ]);

        setClients(clientRes.data);
        setMembers(memberRes.data.filter((user) => user.role !== "client"));
      } catch (error) {
        console.error("❌ Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/projects", {
        ...form,
        client_id: parseInt(form.client_id, 10), // Tambahkan radix 10
      });

      const newProjectId = res.data.id;

      // Buat array of promises untuk dikirim secara paralel
      const memberPromises = selectedMemberIds.map(userId =>
        axios.post(
          `http://localhost:5000/api/projects/${newProjectId}/members`,
          { user_id: userId }
        )
      );
      await Promise.all(memberPromises);

      alert("✅ Project dan anggota berhasil ditambahkan!");
      setForm({
        name: "",
        client_id: "",
        status: "pending",
        deadline: "",
        description: "",
      });
      setSelectedMemberIds([]);
    } catch (err) {
      console.error("❌ Gagal menambahkan project:", err.response?.data || err.message);
      alert("❌ Gagal menambahkan project.");
    }
  };
  
  // Fungsi untuk menampilkan nama anggota yang dipilih
  const getSelectedMembersDisplay = () => {
    if (selectedMemberIds.length === 0) {
      return "Pilih anggota proyek";
    }
    const selectedNames = members
      .filter(member => selectedMemberIds.includes(member.id))
      .map(member => member.name);
      
    if (selectedNames.length > 2) {
      return `${selectedNames.slice(0, 2).join(', ')} dan ${selectedNames.length - 2} lainnya`;
    }
    return selectedNames.join(', ');
  };


  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">➕ Tambah Project</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Nama Proyek */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Proyek</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Select Klien */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Klien</label>
          <select
            name="client_id"
            value={form.client_id}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">-- Pilih Klien --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="ongoing">On Going</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Input Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Input Deskripsi */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* REFACTOR: Multi select Listbox anggota */}
        <div>
          <Listbox value={selectedMemberIds} onChange={setSelectedMemberIds} multiple>
            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">Anggota Proyek</Listbox.Label>
            <div className="relative mt-1">
              <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                <span className="block truncate">{getSelectedMembersDisplay()}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {members.map((user) => (
                    <ListboxOption
                      key={user.id}
                      value={user.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>
                            {user.name} ({user.email})
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
        >
          Simpan Proyek
        </button>
      </form>
    </div>
  );
};

export default AddProject;