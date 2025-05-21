import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../components/ui/shared/Navbar";

const AdminDashboard = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: "📊 Dashboard", path: "/admin/dashboard" },
    { label: "👤 Manage Users", path: "/admin/users" },
    { label: "🏢 Recruiters", path: "/admin/recruiters" },
    { label: "📄 Manage Jobs", path: "/admin/jobs/" },
    { label: "📝 Applications", path: "/admin/applications" },
    { label: "🤖 AI Screening Logs", path: "/admin/screening" },
    { label: "🏬 Companies", path: "/admin/companies" },
    { label: "📈 Reports", path: "/admin/reports" }
  ];

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex gap-4">
        {/* Sidebar */}
        <div className="w-[17rem] max-h-screen bg-white shadow p-4">
          <ul className="space-y-4 text-sm text-gray-700">
            {navItems.map((item, index) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 rounded text-[1.2rem] hover:bg-gray-200 ${
                      isActive ? "bg-blue-100 font-semibold text-blue-600" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
