import { ChevronRight, Search, Volleyball } from "lucide-react";
import { DashboardLayout } from "@/layouts";
import { Calendar, Profile2User, Setting2, Ticket, Ticket2 } from "iconsax-reactjs";
import { Link } from "react-router-dom";
import { useAdmin, useBets, useMatches, useUsers } from "@/hooks";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/modal";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";

export default function Home() {
  const { users } = useUsers();
  const { matches } = useMatches();
  const { bets, bet, fetchingBet, getBetByBookingCode } = useBets();
  const { admin, isLoading, isError, isUpdating, updateData } = useAdmin();
  const currentWeek = admin?.currentWeek;
  const statCards = [
    {
      title: "Total Users",
      value: users?.length,
      icon: Profile2User,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Bets",
      value: bets?.length,
      icon: Ticket,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total Matches",
      value: matches?.length,
      icon: Volleyball,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Week",
      value:
        isLoading
          ? "…"
          : currentWeek !== undefined && currentWeek !== null
            ? currentWeek
            : "—",
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [bookingCode, setBookingCode] = useState("");
 
  const [week, setWeek] = useState("");
  useEffect(() => {
    if (admin?.currentWeek !== undefined && admin.currentWeek !== null) {
      setWeek(String(admin.currentWeek));
    }
  }, [admin?.currentWeek]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!admin?.id) return;
    const weekNumber = Number(week);
    if (!Number.isInteger(weekNumber) || weekNumber < 0) return;
    updateData(weekNumber, admin.id);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookingCode) return toast.error("Booking code is required");
    getBetByBookingCode(bookingCode);
  };

  function Greet() {
    return (
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight font-space">
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted mt-1 font-normal">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>
    );
  }
  return (
    <>
      <DashboardLayout title={<Greet />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white border border-line rounded-lg p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted mb-1">{card.title}</p>
                    <p className="text-2xl font-bold font-space mb-2">
                      {card.value}
                    </p>
                  </div>
                  <div className={`${card.bgColor} p-3 rounded-lg`}>
                    <Icon size={24} className={card.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold font-space mb-1">
              Quick Actions
            </h3>
            <p className="text-sm text-muted">Common administrative tasks</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white border border-line rounded-lg p-6 hover:border-primary/40 transition-colors space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 h-10 w-10 center rounded-lg">
                  <Ticket2 size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className=" font-bold font-space">
                    Manage Bookies
                  </h4>
                  <p className="text-muted text-sm">View and manage bookies</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(true)} className="btn btn-primary w-full rounded h-10">

                Open Modal
              </button>
            </div>
            <div className="bg-white border border-line rounded-lg p-6 hover:border-primary/40 transition-colors space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/10 h-10 w-10 center rounded-lg">
                  <Calendar size={20} className="text-green-500" />
                </div>
                <div>
                  {/* <h4 className="text-lg font-bold font-space">
                  Create New Match
                </h4> */}
                  <p className="text-muted">Schedule a new match event</p>
                </div>
              </div>
              <Link to="/matches" className="btn btn-primary w-full rounded h-10">
                <Setting2 size={18} />
                Manage Matches
              </Link>
            </div>

            <div className="bg-white border border-line rounded-lg p-6 hover:border-primary/40 transition-colors space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/10 h-10 w-10 center rounded">
                  <Profile2User size={20} className="text-purple-500" />
                </div>
                <div>
                  {/* <h4 className="text-lg font-bold font-space">Manage Users</h4> */}
                  <p className="text-muted">View and manage all users</p>
                </div>
              </div>
              <Link to="/users" className="btn btn-primary w-full rounded h-10">
                <Setting2 size={18} />
                Manage Users
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold font-space mb-1">
              Current Week
            </h3>
            <p className="text-sm text-muted">
              Add and update the match current week
            </p>
          </div>

          {isError && (
            <p className="text-sm text-red-500">
              Failed to load week. Please refresh the page.
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-line rounded p-4 space-y-6 max-w-md"
          >
            <InputWithoutIcon
              label="Week"
              type="number"
              name="week"
              placeholder="Update match week"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              min={0}
            />
            <ButtonWithLoader
              initialText="Update"
              loadingText="Updating..."
              loading={isUpdating}
              type="submit"
              disabled={
                isUpdating ||
                isLoading ||
                !admin?.id ||
                week === "" ||
                !Number.isInteger(Number(week)) ||
                Number(week) < 0
              }
              className="w-full h-10 btn-primary rounded"
            />
          </form>
        </div>
      </DashboardLayout>


      <AnimatePresence>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Search Bet"
          >
            <div>
              <p>Search for a bets by booking code</p>

              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex items-center gap-2 bg-gray-100 w-full h-10 rounded-lg border border-line focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 px-2">
                  <Search
                    size={20}
                    className="text-muted"
                  />
                  <input type="text" value={bookingCode} onChange={(e) => setBookingCode(e.target.value)} placeholder="Enter Booking Code" className="text-sm" />
                </div>

                <ButtonWithLoader
                  initialText="Search"
                  loadingText="Searching..."
                  loading={fetchingBet}
                  type="submit"

                  className="w-full h-10 btn-primary rounded"
                />
              </form>

              {bet && (
                <Link
                  to={`/bets/${bet.bookingCode}`}
                  className="block mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="rounded-xl border border-line bg-gray-100 p-2 hover:border-primary/50 transition-all duration-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded">
                            {bet.bookingCode}
                          </span>
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded capitalize ${
                              bet.status === "done"
                                ? "bg-green-500/10 text-green-600"
                                : "bg-amber-500/10 text-amber-600"
                            }`}
                          >
                            {bet.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted">Stake:</span>
                            <span className="font-semibold font-space">₦{Number(bet.stakeAmount).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted">Type:</span>
                            <span className="font-medium capitalize">{bet.betType}</span>
                          </div>
                          <div className="flex md:items-center flex-wrap gap-2">
                            <span className="text-muted">Created:</span>
                            <span className="font-medium">{formatDate(new Date(bet.createdAt ?? ""))}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ChevronRight size={20} className="text-primary" />
                      </div>
                    </div>
                    <p className="text-xs text-muted mt-3 pt-3 border-t border-line">
                      View full details and mark as done
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
