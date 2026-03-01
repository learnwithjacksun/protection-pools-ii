import { navbarItems } from "@/constants/data";
import { AnimatePresence } from "framer-motion";
import { Menu, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MobileBar from "./mobilebar";
import { useAuth } from "@/hooks";
import { ButtonWithLoader } from "../ui";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-background backdrop-blur border-b border-line">
        <nav className="main flex items-center justify-between">
          <Link to="/" className="text-nowrap md:text-xl font-semibold">
            Protection <span className="text-primary-2">Pools</span>.
          </Link>

          <div className="flex items-center gap-4">
            <ul className="lg:flex hidden items-center border-r border-line pr-4">
              {navbarItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "flex gap-2 py-4 px-3 items-center text-sm font-semibold text-nowrap bg-primary-2 text-white"
                        : "text-muted py-4 px-3 transition-colors duration-200 bg-white hover:bg-primary-2 hover:text-white text-sm flex gap-2 items-center text-nowrap"
                    }
                  >
                    <item.icon size={19} />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 center text-xl font-semibold rounded-full bg-primary text-white">
                  {user.name.split(" ")[0].charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block">
                  <ButtonWithLoader
                    initialText="Logout"
                    loadingText="Logging out..."
                    loading={loading}
                    onClick={() => {
                      logout();
                    }}
                    className="btn bg-red-600/10 text-red-600 h-10 px-4 rounded"
                  />
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn text-primary underline py-4 flex items-center gap-2">
                <UserRound size={19} />
                Account
              </Link>
            )}

            <div
              onClick={() => setIsOpen(true)}
              className="border-l border-line pl-4 py-4 cursor-pointer lg:hidden block"
            >
              <Menu />
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <MobileBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
