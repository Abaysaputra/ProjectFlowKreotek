import { useEffect, useState } from "react";
import axios from "axios";

const ProjectTasks = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${projectId}/tasks`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, [projectId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🧩 Tasks Project #{projectId}</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white rounded-xl p-4 shadow border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">Status: {task.status}</p>
            <p className="text-sm text-gray-500">Assigned to: {task.assigned_to}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTasks;
