import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <aside className={`w-64 bg-white border-r shadow h-screen p-4 ${isOpen ? "" : "hidden md:block"}`}>
      <h2 className="text-xl font-bold mb-6">📁 ProjectFlow</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/" className="hover:text-blue-600">🏠 Dashboard</Link>
        <Link to="/projects" className="hover:text-blue-600">📋 Projects</Link>
        <Link to="/projects/add" className="hover:text-blue-600">➕ Tambah Project</Link>
        <Link to="/clients/add" className="hover:text-blue-600">👥 Clients</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
