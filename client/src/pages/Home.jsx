import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">ProjectFlow OS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} name={p.name} status={p.status} />
        ))}
      </div>
    </div>
  );
}
