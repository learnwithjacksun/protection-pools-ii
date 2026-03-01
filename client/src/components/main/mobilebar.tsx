import { X } from "lucide-react";
import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navbarItems } from "@/constants/data";
import { ButtonWithLoader } from "../ui";
import { useAuth } from "@/hooks";

interface MobileBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileBar({ isOpen, onClose }: MobileBarProps) {
  const { user, logout, loading } = useAuth();

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

  const getUserInitials = () => {
    if (!user?.name) return "";
    const name = user.name;
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase().slice(0, 2);
  };
  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 z-50 bg-black/10 backdrop-blur"
      />

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        exit={{ opacity: 0, scaleX: 0 }}
        className="w-[70%] origin-left relative h-[100dvh] bg-white z-100"
      >
        <header className="flex items-center justify-between h-[70px] px-4">
          <div className="md:h-12 md:w-12 h-10 w-10 center">
            <img
              src="/logo.png"
              alt="logo"
              className="h-full w-full object-cover"
            />
          </div>

          <button
            className="center p-2 rounded-full bg-foreground"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>

        <ul className="flex flex-col gap-2">
          {navbarItems.map((tab) => (
            <li key={tab.path} className="pl-4">
              <NavLink
                to={tab.path}
                onClick={onClose}
                className={({ isActive }) =>
                  isActive
                    ? "bg-red-600 text-white rounded-l-full p-4 md:pl-8 flex items-center gap-2 font-space"
                    : " text-muted p-4 md:pl-8 pl-4 rounded-l-full flex items-center gap-2 hover:bg-foreground hover:text-main"
                }
              >
                <tab.icon size={20} />
                <span className="text-sm font-space">{tab.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-auto w-[90%] mx-auto space-y-2 mb-4 absolute bottom-0 left-0 right-0">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="btn text-sm h-12 border border-line text-main w-full rounded flex items-center justify-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="btn btn-primary text-sm h-12 w-full rounded flex items-center justify-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 p-4 bg-foreground rounded-lg mb-2">
                <div className="h-10 w-10 min-w-10 min-h-10 center rounded-full bg-primary overflow-hidden text-white font-medium">
                  {getUserInitials()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-main truncate">{user.name}</p>
                  <p className="text-sm text-muted truncate">{user.email}</p>
                </div>
              </div>
              <ButtonWithLoader
                initialText="Logout"
                loadingText="Logging out..."
                loading={loading}
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full bg-red-600/10 text-red-600 h-12 rounded"
              />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
