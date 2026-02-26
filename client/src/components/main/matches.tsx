import { Search, Loader } from "lucide-react";
import { useState } from "react";
import MatchCard from "./match-card";
import { useMatches } from "@/hooks";

export default function Matches() {
  const { matches, fetchingMatches} = useMatches();
  const [search, setSearch] = useState("");

  const searchTerm = search.toLowerCase().trim();

  const filteredMatches = matches?.filter((match) => {
   

    const matchesSearch =
      match.homeTeam.toLowerCase().includes(searchTerm) ||
      match.awayTeam.toLowerCase().includes(searchTerm);

    return matchesSearch;
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
