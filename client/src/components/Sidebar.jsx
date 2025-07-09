
import { useState } from 'react'; 
import { NavLink } from "react-router-dom";
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, toggle }) => {
  const [isProjectsOpen, setProjectsOpen] = useState(false);
const navLinkClassName = ({ isActive }) =>
  `p-2 rounded-md transition-colors flex items-center gap-3 whitespace-nowrap overflow-hidden text-ellipsis ${ // Tambahkan overflow-hidden dan text-ellipsis
    isActive
      ? 'bg-blue-600 text-white font-semibold'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  }`;
 const navContent = (
    <nav className="flex flex-col gap-2">
      <NavLink to="/dashboard" className={navLinkClassName} onClick={isOpen ? toggle : undefined}>
        🏠 Dashboard
      </NavLink>

      {/* Menu Project dengan Dropdown */}
      <div>
        <button
          onClick={() => setProjectsOpen(!isProjectsOpen)}
          className="w-full p-2 rounded-md flex items-center justify-between text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <span className="flex items-center gap-3">
            📄 Projects
          </span>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform ${isProjectsOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Submenu yang muncul/hilang */}
        {isProjectsOpen && (
          <div className="mt-1 pl-7 flex flex-col gap-1">
            <NavLink
              to="/projects"
              end // 'end' prop penting agar ini tidak aktif saat di /projects/add
              className={navLinkClassName}
              onClick={isOpen ? toggle : undefined}
            >
              Semua Proyek
            </NavLink>
            <NavLink
              to="/projects/add"
              className={navLinkClassName}
              onClick={isOpen ? toggle : undefined}
            >
              Tambah Project
            </NavLink>
          </div>
        )}
      </div>

      <NavLink to="/clients/add" className={navLinkClassName} onClick={isOpen ? toggle : undefined}>
        👥 Clients
      </NavLink>
    </nav>
  );

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:block w-64 bg-white text-gray-800 h-screen p-4 shadow-lg fixed top-0 left-0 border-r border-gray-200 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8 p-3">🚀 ProjectFlow</h2>
        {navContent}
      </aside>

      {/* Sidebar Mobile (Drawer) */}
      <div className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black opacity-30" onClick={toggle}></div>

        <aside className="relative w-64 bg-white text-gray-800 h-full p-4 shadow-lg z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold p-3">🚀 ProjectFlow</h2>
            <button onClick={toggle} className="text-gray-600 focus:outline-none">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          {navContent}
        </aside>
      </div>
    </>
  );
};

export default Sidebar;