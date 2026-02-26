import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cup, LogoutCurve, Profile2User } from "iconsax-reactjs";
import MobileMenu from "./mobilemenu";
import { useAuth } from "@/hooks";

export default function Header() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-[70px] gap-4">
          {/* Page title + context */}
          <div
            className="md:invisible visible h-10 w-10 center bg-secondary rounded-full cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={20} />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* User dropdown (static for now) */}
            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex cursor-pointer items-center gap-2"
              >
                <div className="center h-9 w-9 overflow-hidden rounded-full bg-primary/50">
                  <img
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURI(user?.name || "")}`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="md:flex hidden flex-col items-start">
                  <span className="text-xs font-medium leading-tight">
                    {user?.name}
                  </span>
                  <span className="text-[11px] text-muted leading-tight">
                    {user?.email}
                  </span>
                </div>
                <ChevronDown size={18} className="text-muted shrink-0" />
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      onClick={() => setIsDropdownOpen(false)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 h-screen w-screen z-40"
                    />
                    {/* Dropdown Menu */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-gray-200 bg-white shadow-lg p-4"
                    >
                      <div className="flex md:hidden items-center gap-3 border-b border-line pb-3 mb-3">
                        <div className="center h-10 w-10 min-w-10 overflow-hidden rounded-full bg-primary/50">
                          <img
                            src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURI(user?.name || "")}`}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="overflow-x-hidden">
                          <div className="text-sm font-semibold text-gray-900">
                            {user?.name}
                          </div>
                          <div className="text-xs text-muted truncate text-ellipsis">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Link
                          to="/matches"
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted hover:bg-primary/5 hover:text-primary transition"
                        >
                          <Cup size={18} />
                          Matches
                        </Link>
                        <Link
                          to="/users"
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted hover:bg-primary/5 hover:text-primary transition"
                        >
                          <Profile2User size={18} />
                          Users
                        </Link>
                        <button
                          onClick={() => logout()}
                          className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 bg-red-50 hover:text-red-700 transition flex items-center gap-2 mt-2 pt-3"
                        >
                          Logout
                          <LogoutCurve size={20} />
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
