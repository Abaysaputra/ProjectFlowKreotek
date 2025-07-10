// src/components/ProjectMembers.jsx
import { useEffect, useState } from "react";
import axios from "../utils/axios";

const ProjectMembers = ({ projectId }) => {
const [members, setMembers] = useState([]);

useEffect(() => {
    if (!projectId) return;
    axios.get(`/api/projects/${projectId}/members`)
    .then(res => setMembers(res.data))
    .catch(err => console.error("Gagal mengambil anggota:", err));
}, [projectId]);

return (
    <div className="mt-4">
    <h4 className="text-sm font-semibold text-gray-600 mb-2">👥 Anggota Proyek</h4>
    <ul className="list-disc list-inside text-sm text-gray-700">
        {members.length === 0 ? (
        <li className="text-gray-400 italic">Belum ada anggota</li>
        ) : (
        members.map((member) => (
            <li key={member.id}>
            {member.name} <span className="text-gray-400 text-xs">({member.email})</span>
            </li>
        ))
        )}
    </ul>
    </div>
);
};

export default ProjectMembers;
