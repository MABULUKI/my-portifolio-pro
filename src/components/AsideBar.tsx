import React from "react";

interface AsideBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const AsideBar: React.FC<AsideBarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navItems = [
    "Dashboard Overview",
    "Manage Images",
    "Manage Projects",
    "Manage Posts",
    "Manage Services",
  ];

  return (
    <>
      {/* Sidebar Wrapper */}
      <div
        className={`bg-[#212121] min-h-screen text-white w-64 flex flex-col rounded-s-md shadow-xl transition-all duration-300 ease-in-out
        fixed md:static top-0 left-0 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-center items-center h-20 border-b border-white/10">
          <h4 className="text-center text-2xl font-semibold tracking-wide">
            Admin Panel
          </h4>
        </div>

        {/* Main Section */}
        <div className="bg-[#212121]/90 mt-5 px-4 flex flex-col justify-start items-start space-y-2 transition-all duration-300 ease-in-out w-full">
          {navItems.map((nav, index) => (
            <small
              key={index}
              className={`transition-colors duration-200 text-center px-4 py-2 w-full cursor-pointer rounded-md
                ${activeTab === nav
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-500 hover:text-white"
                }`}
              onClick={() => {
                setActiveTab(nav);
                setIsOpen(false); // close on mobile
              }}
            >
              {nav}
            </small>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AsideBar;
