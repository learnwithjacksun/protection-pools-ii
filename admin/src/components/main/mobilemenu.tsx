import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { navItems } from "@/constants/data";
import { LogoutCurve } from "iconsax-reactjs";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div>
      <div className="fixed inset-0 z-100">
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 z-40 backdrop-blur-sm"
        />

        <motion.aside
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0, opacity: 0 }}
          className="relative origin-left z-100 h-[100dvh] flex min-w-[260px] max-w-[280px] flex-col bg-white"
        >
          {/* Brand */}
          <header className="h-[70px] flex items-center justify-between px-5 border-b border-white/10">
            <Link to="/dashboard" className="">
              <img
                src="/logo.png"
                alt="BoostBills logo"
                width={40}
                height={40}
              />
            </Link>
            <button className=" w-6 h-6 cursor-pointer" onClick={onClose}>
              <X />
            </button>
          </header>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-hidden space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.to ||
                location.pathname.startsWith(item.to + "/");

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                  className={`group flex items-center gap-3 py-3 px-4 rounded text-sm transition-all
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
        </motion.aside>
      </div>
    </div>
  );
}
