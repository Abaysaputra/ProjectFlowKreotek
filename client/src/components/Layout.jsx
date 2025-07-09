// src/components/Layout.jsx

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import Navbar from './Navbar';  

const Layout = () => {
const [isSidebarOpen, setSidebarOpen] = useState(false);

const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
};

return (
    <div className="flex h-screen bg-gray-100">
    <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

    <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:ml-64">
        <Outlet />
        </main>
    </div>
    </div>
);
};

export default Layout;