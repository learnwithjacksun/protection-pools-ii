import { PlusCircle } from "lucide-react";
import { DashboardLayout } from "@/layouts";
import { Calendar, Profile2User, Setting2, Ticket } from "iconsax-reactjs";
import { Link } from "react-router-dom";

export default function Home() {
  const statCards = [
    {
      title: "Total Users",
      value: 0,
      icon: Profile2User,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Bets",
      value: 0,
      icon: Ticket,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    // {
    //   title: "Pending Bets",
    //   value: 0,
    //   change: `0 won, 0 lost`,
    //   icon: Clock,
    //   color: "text-yellow-500",
    //   bgColor: "bg-yellow-500/10",
    // },
    {
      title: "Total Matches",
      value: 0,
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

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
    <DashboardLayout title={<Greet />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          {/* <div className="bg-secondary border border-line rounded-lg p-6 hover:border-primary/40 transition-colors space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <Profile2User size={24} className="text-blue-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-space">Create New User</h4>
                <p className="text-sm text-muted">Add a new user to the platform</p>
              </div>
            </div>
            <Link to="/users" className="btn btn-primary w-full rounded-md h-10">
              <PlusCircle size={18} />
              Create User
            </Link>
          </div> */}

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
            <Link
              to="/matches"
              className="btn btn-primary w-full rounded h-10"
            >
              <PlusCircle size={18} />
              Create Match
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
            <Link
              to="/users"
              className="btn btn-primary w-full rounded h-10"
            >
              <Setting2 size={18} />
              Manage Users
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
