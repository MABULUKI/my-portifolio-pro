import React, { useState } from "react";
import AsideBar from "../components/AsideBar";
import DashboardOverview from "../pages/admin/DashboardOverview";
import HeroImagesPanel from "../pages/admin/HeroImagesPanel";
import ProjectsPanel from "../pages/admin/ProjectsPanel";
import BlogsPanel from "../pages/admin/BlogsPanel";
import ServicesPanel from "../pages/admin/ServicesPanel";
import { CiMenuBurger } from "react-icons/ci";

const AdminLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Dashboard Overview");
  const [isOpen, setIsOpen] = useState(false); // 👈 sidebar toggle state

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard Overview":
        return <DashboardOverview />;
      case "Manage Images":
        return <HeroImagesPanel />;
      case "Manage Projects":
        return <ProjectsPanel />;
      case "Manage Posts":
        return <BlogsPanel />;
      case "Manage Services":
        return <ServicesPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] text-[#212121] m-4 relative">
      {/* Sidebar */}
      <AsideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto bg-white rounded-e-md">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 border-b border-blue-100 pb-4">
          <div className="flex items-center gap-4">
            {/* Burger menu for mobile */}
            <CiMenuBurger
              className="text-2xl text-blue-500 cursor-pointer md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            />
            <h4 className="">Admin Panel</h4>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-xs">Admin</span>
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
              alt="Admin Avatar"
            />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="bg-white rounded-md shadow-sm p-6 border border-blue-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
