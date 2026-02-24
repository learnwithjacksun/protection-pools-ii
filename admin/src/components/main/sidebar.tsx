import { Link, NavLink, useLocation } from "react-router-dom";
import { navItems } from "@/constants/data";
import { LogoutCurve } from "iconsax-reactjs";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex min-w-[260px] max-w-[280px] flex-col bg-white border-r border-line">
      {/* Brand */}
      <header className="h-[70px] flex items-center justify-between px-5 border-b border-line">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src="/logo.png" alt="BoostBills logo" width={40} height={40} />
          <span className="font-semibold text-lg">Protection Pools</span>
        </Link>
      </header>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.to ||
            location.pathname.startsWith(item.to + "/");

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 py-3 px-4 rounded text-[15px]  transition-all
                ${
                  isActive
                    ? "bg-primary-2 text-white shadow-sm font-medium"
                    : "text-muted hover:text-primary-2"
                }`}
            >
              <span>
                <Icon size={20} />
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User summary / logout */}
      <footer className="py-4 border-t border-red-500/5 bg-red-500/10">
        <button
          onClick={() => {}}
          className="w-full  text-sm font-medium text-red-600 hover:text-red-700 transition flex items-center gap-2"
        >
          Logout
          <LogoutCurve size={20} />
        </button>
      </footer>
    </aside>
  );
}
