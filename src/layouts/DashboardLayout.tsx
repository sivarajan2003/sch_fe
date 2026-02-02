import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const [openSidebar, setOpenSidebar] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false);    // desktop
  const location = useLocation();
  

  useEffect(() => {
    setOpenSidebar(false); // close mobile drawer on route change
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50">

      {/* ===== Desktop Sidebar (COLLAPSIBLE) ===== */}
      {/* ===== Desktop Sidebar ===== */}
<aside className="hidden lg:block h-screen">
  <Sidebar collapsed={collapsed} />
</aside>

      {/* ===== Mobile Sidebar Drawer ===== */}
      {openSidebar && (
  <div className="fixed inset-0 z-50 lg:hidden">
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setOpenSidebar(false)}
    />
    <div className="absolute left-0 top-0 h-screen w-64 bg-white shadow-xl">
      <Sidebar collapsed={false} />
    </div>
  </div>
)}


      {/* ===== Right Content ===== */}
      <div className="flex-1 flex flex-col overflow-hidden">

      <Header
  onMenuClick={() => {
    if (window.innerWidth >= 1024) {
      setCollapsed(prev => !prev); // IMG-1 behavior
    } else {
      setOpenSidebar(true);        // mobile drawer
    }
  }}
/>


        <main className="flex-1 overflow-y-auto p-3 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
