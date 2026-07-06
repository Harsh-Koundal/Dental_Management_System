import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  BarChart3,
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  Home,
  Stethoscope,
  CalendarDays,
  ImageIcon,
  BookOpen,
} from "lucide-react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../../public/logo.jpg"

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1024);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const modules = [
    { id: "overview",     name: "Overview",            icon: LayoutDashboard, path: "/admin-dashboard/overview" },
    { id: "treatments",   name: "Treatments",          icon: Stethoscope,     path: "/admin-dashboard/treatments" },
    { id: "patients",     name: "Manage Patients",     icon: Users,           path: "/admin-dashboard/manage-patients" },
    { id: "booking",      name: "Booking Management",  icon: CalendarDays,    path: "/admin-dashboard/booking-management" },
    { id: "gallery",      name: "Gallery Management",  icon: ImageIcon,       path: "/admin-dashboard/gallery-management" },
    { id: "case-studies", name: "Case Studies",        icon: BookOpen,        path: "/admin-dashboard/case-studies" },
    { id: "settings",     name: "Settings",            icon: Settings,        path: "/admin-dashboard/settings" },
  ];

  const getActiveModule = () => {
    const path = location.pathname;
    return modules.find((m) => path.includes(m.id))?.id || "overview";
  };

  const activeModule = getActiveModule();

  const handleModuleClick = (module) => {
    navigate(module.path);
    setSidebarOpen(false);
  };

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-emerald-50 px-6 py-7">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-[10px]">
            <img src={logo}/>
          </div>
          <div>
            <p className="m-0 text-base font-bold text-slate-900">Panda Smile</p>
            <p className="m-0 text-xs tracking-widest text-slate-500">ADMIN PANEL</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          return (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module)}
              className={`flex w-full items-center justify-between rounded-2xl border-none px-3.5 py-2.5 text-left text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-emerald-100 font-semibold text-emerald-900'
                  : 'cursor-pointer text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={18} color={isActive ? '#10b981' : '#9ca3af'} />
                <span>{module.name}</span>
              </div>
              {isActive && <ChevronRight size={15} color="#10b981" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100">
            <span className="text-xs font-bold text-emerald-900">SA</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="m-0 text-sm font-semibold text-slate-900">Admin</p>
            <p className="m-0 truncate text-xs text-slate-400">admin@gmail.com</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border-none bg-transparent p-1 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex h-full w-full max-w-xs flex-col border-r border-slate-200 bg-white shadow-2xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 border-none bg-none p-1.5 cursor-pointer"
            >
              <X size={18} color="#6b7280" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="sticky top-0 h-screen w-64 shrink-0 border-r border-slate-200 bg-white shadow-sm">
          <SidebarContent />
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Topbar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="border-none bg-none p-1.5 cursor-pointer"
            >
              <Menu size={22} color="#374151" />
            </button>
          )}

          <h2 className="m-0 text-sm font-semibold text-slate-900" style={{ flex: isMobile ? 1 : "unset" }}>
            {modules.find((m) => m.id === activeModule)?.name || "Dashboard"}
          </h2>

          {/* Search */}
          {!isMobile && (
            <div className="relative mx-6 max-w-sm flex-1">
              <Search size={15} color="#9ca3af" className="absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-700 outline-none placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_2px_#d1fae5] transition-all"
              />
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="rounded-lg border-none bg-none p-1.75 cursor-pointer hover:bg-slate-100 transition-colors"
              title="Home"
            >
              <Home size={18} color="#6b7280" />
            </button>
            <button
              className="relative rounded-lg border-none bg-none p-1.75 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <Bell size={18} color="#6b7280" />
              <span className="absolute right-1.5 top-1.5 h-1.75 w-1.75 rounded-full border-1.5 border-white bg-emerald-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}