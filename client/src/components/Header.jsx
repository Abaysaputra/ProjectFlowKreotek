import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, PowerIcon } from "@heroicons/react/24/outline";

const Header = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-white px-6 py-3 border-b border-gray-200 sticky top-0 z-20 md:ml-64">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden text-gray-700 focus:outline-none">
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 hidden sm:inline">👋 Hi, Admin</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm transition"
        >
          <PowerIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;