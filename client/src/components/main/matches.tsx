import { Search, Loader, CalendarX2 } from "lucide-react";
import { useState } from "react";
import MatchCard from "./match-card";
import { useAdmin, useMatches } from "@/hooks";

export default function Matches() {
  const { admin } = useAdmin();
  const { matches, fetchingMatches} = useMatches();
  const [search, setSearch] = useState("");

  const searchTerm = search.toLowerCase().trim();

  const filteredMatches = matches?.filter((match) => {
    const matchesCurrentWeek =
      admin?.currentWeek === undefined || match.week === admin.currentWeek;
    const matchesSearch =
      match.homeTeam.toLowerCase().includes(searchTerm) ||
      match.awayTeam.toLowerCase().includes(searchTerm);

    return matchesCurrentWeek && matchesSearch;
  });

  return (
     <div className="w-[90%] py-6 mx-auto  space-y-4">
      <div className="flex items-center bg-white gap-4 border border-line rounded-md px-4 focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary">
        <Search className="text-muted" />
        <input
          type="text"
          placeholder="Search by team name..."
          className="h-12 text-sm w-full flex-1"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className=" bg-white p-4 rounded flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm">Current Week</p>
          <h3 className="text-3xl font-semibold">{admin?.currentWeek}</h3>
        </div>
        <div className=" gap-4 bg-primary/10 h-14 w-14 center rounded">
          <CalendarX2 size={24} className="text-primary" />
        </div>
      </div>
      

      {fetchingMatches && (
        <div className="flex items-center justify-center gap-4 h-48">
          <Loader size={18} className="animate-spin" /> Fetching matches...
        </div>
      )}

      {filteredMatches?.length === 0 && (
        <div className="flex items-center justify-center h-48">
          <span className="text-muted">No matches found</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {filteredMatches?.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
     </div>
  )
}
