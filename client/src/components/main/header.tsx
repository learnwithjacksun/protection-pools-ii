import { navbarItems } from "@/constants/data";
import { AnimatePresence } from "framer-motion";
import { Menu, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MobileBar from "./mobilebar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-background backdrop-blur">
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
            <Link to="/login" className="btn text-primary underline py-4">
              <UserRound size={19} />
              Account
            </Link>

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
