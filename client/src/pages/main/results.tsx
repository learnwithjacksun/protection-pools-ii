import { weeks } from "@/constants/data";
import { useAdmin, useMatches } from "@/hooks";
import { MainLayout } from "@/layouts";
import { ChevronDown, Loader } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ResultType = "Draw" | "Home Win" | "Away Win" | "None";
type StatusType = "win" | "lost" | "none";

function getResultAndStatus(match: IMatch): { result: ResultType; status: StatusType } {
  const completed = match.status === "completed";
  if (!completed) {
    return { result: "None", status: "none" };
  }
  const { homeScore, awayScore } = match;
  if (homeScore === awayScore) {
    return { result: "Draw", status: "win" };
  }
  if (homeScore > awayScore) {
    return { result: "Home Win", status: "lost" };
  }
  return { result: "Away Win", status: "lost" };
}

export default function Results() {
  const { admin } = useAdmin();
  const { matches, fetchingMatches } = useMatches();
  const [week, setWeek] = useState<number>(admin?.currentWeek ?? 1);

  useEffect(() => {
    if (admin?.currentWeek != null) setWeek(admin.currentWeek);
  }, [admin?.currentWeek]);

  const weekOptions = useMemo(
    () => weeks.filter((w) => w.value !== ""),
    []
  );

  const filteredMatches = useMemo(() => {
    if (!matches) return [];
    return matches
      .filter((m) => m.week === week)
      .sort((a, b) => a.matchNo - b.matchNo);
  }, [matches, week]);

  return (
    <MainLayout>
      <section className="main py-6">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold uppercase">
            Week: {week}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">Select Week</span>
            <div className="relative w-fit">
              <select
                name="week"
                id="week"
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                className="appearance-none h-11 min-w-[80px] pl-3 pr-8 border border-line rounded bg-white text-sm font-medium"
              >
                {weekOptions.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>
        </header>

        {fetchingMatches && (
          <div className="flex items-center justify-center gap-4 h-48">
            <Loader size={20} className="animate-spin text-primary" />
            <span className="text-muted">Loading results...</span>
          </div>
        )}

        {!fetchingMatches && filteredMatches.length === 0 && (
          <div className="bg-white border border-line rounded-lg p-8 text-center">
            <p className="text-muted">No matches for this week.</p>
          </div>
        )}

        {!fetchingMatches && filteredMatches.length > 0 && (
          <div className="bg-white border border-line rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left font-semibold py-3 px-4 w-14">P</th>
                    <th className="text-left font-semibold py-3 px-4">Match</th>
                    <th className="text-left font-semibold py-3 px-4 min-w-[100px]">Result</th>
                    <th className="text-left font-semibold py-3 px-4 min-w-[80px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMatches.map((match, index) => {
                    const { result, status } = getResultAndStatus(match);
                    const isEven = index % 2 === 0;
                    const rowBg = isEven ? "bg-primary/5" : "bg-white";
                    const resultColor =
                      result === "Draw" ? "text-green-600" : result === "None" ? "text-main" : "text-red-600";
                    const statusColor =
                      status === "win" ? "text-green-600" : status === "none" ? "text-main" : "text-red-600";
                    return (
                      <tr key={match.id} className={`${rowBg} border-b border-line last:border-0`}>
                        <td className="py-3 px-4 font-medium">{match.matchNo}</td>
                        <td className="py-3 px-4 text-nowrap">
                          {match.homeTeam} ({match.homeScore}) vs ({match.awayScore}) {match.awayTeam}
                        </td>
                        <td className={`py-3 px-4 font-medium ${resultColor}`}>{result}</td>
                        <td className={`py-3 px-4 font-medium capitalize ${statusColor}`}>{status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
}
