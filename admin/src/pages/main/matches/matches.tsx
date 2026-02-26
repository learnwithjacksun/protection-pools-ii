import { MatchCard } from "@/components/main/matches";
import { weeks } from "@/constants/data";
import { DashboardLayout } from "@/layouts";
import { ChevronDown, Loader2, PlusCircle, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMatches } from "@/hooks";

export default function Matches() {
  const { matches, fetchingMatches} = useMatches();
  const [search, setSearch] = useState("");
  const [week, setWeek] = useState("");

  const searchTerm = search.toLowerCase().trim();

  const filteredMatches = matches?.filter((match) => {
    const matchesWeek = week === "" || match.week === Number(week);

    const matchesSearch =
      match.homeTeam.toLowerCase().includes(searchTerm) ||
      match.awayTeam.toLowerCase().includes(searchTerm);

    return matchesWeek && matchesSearch;
  });


  return (
    <DashboardLayout title="Manage Matches">
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Week:</span>
          <div className="relative w-fit">
            <select
              name="week"
              id="week"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              className="appearance-none h-11 w-20 border border-line px-2 rounded bg-white"
            >
              {weeks.map((week) => (
                <option key={week.value} value={week.value}>
                  {week.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </div>
        <div>
          <Link
            to="/matches/add"
            className="btn text-primary border border-primary w-fit h-10 px-4 rounded bg-primary/5"
          >
            <PlusCircle size={18} />
            Add Match
          </Link>
        </div>
      </div>

      {fetchingMatches && (
        <div className="flex items-center justify-center h-48">
          <Loader2 size={18} className="animate-spin" /> Fetching matches...
        </div>
      )}

      {filteredMatches?.length === 0 && (
        <div className="flex items-center justify-center h-48">
          <span className="text-muted">No matches found</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMatches?.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </DashboardLayout>
  );
}
