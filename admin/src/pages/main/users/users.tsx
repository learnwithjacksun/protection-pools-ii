import { DashboardLayout } from "@/layouts";
import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { users } from "@/constants/dummy";
import { Link } from "react-router-dom";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout title="Manage Users">
      <div className="flex items-center bg-white gap-4 border border-line rounded-md px-4 focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary">
        <Search className="text-muted" />
        <input
          type="text"
          placeholder="Search by user name..."
          className="h-12 text-sm w-full flex-1"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredUsers.map(user =>(
            <Link key={user.id} to={`/users/details/${user.id}`} className="bg-white p-4 rounded border border-line flex gap-4">
            <div className="h-15 w-15 rounded overflow-hidden">
                <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}`} alt={user.name} />
            </div>
            <div className="flex-1">
                <h3 className="text-md font-semibold">{user.name}</h3>
                <p className="text-muted text-sm">{user.email}</p>
                <div className="flex items-center mt-4 gap-2 text-xs font-semibold">
                    {user.isAdmin ? (
                        <span className="bg-amber-500/10 text-amber-600 px-2 py-1 rounded">Admin</span>
                    ) : (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">User</span>
                    )}
                    {user.isActive ? (
                        <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded">Active</span>
                    ) : (
                        <span className="bg-red-500/10 text-red-600 px-2 py-1 rounded">Inactive</span>
                    )}
                </div>
            </div>
            <ChevronRight size={20} className="text-muted" />
            </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
