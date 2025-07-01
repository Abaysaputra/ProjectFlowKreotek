const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex justify-between items-center bg-white px-4 py-3 shadow-md sticky top-0 z-10">
      <button onClick={toggleSidebar} className="md:hidden text-gray-700">
        ☰
      </button>
      <h1 className="font-semibold text-lg">Dashboard</h1>
      <div className="text-sm text-gray-600">👋 Hi, Admin</div>
    </header>
  );
};

export default Header;

