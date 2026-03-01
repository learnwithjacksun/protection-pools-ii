import clsx from "clsx";
import { CheckCircle, Circle } from "lucide-react";
import { useMatchStore } from "@/store";

export default function MatchCard({ match }: { match: IMatch }) {
  const { selectedMatches, setSelectedMatches, betType } = useMatchStore();
  const isSelected = selectedMatches.some((m) => m.id === match.id);
  const isNap = betType === "nap";
  const atNapLimit = isNap && selectedMatches.length >= 3;
  const canAdd = !atNapLimit || isSelected;

  const handleToggle = () => {
    if (isSelected) {
      setSelectedMatches(selectedMatches.filter((m) => m.id !== match.id));
    } else {
      if (!canAdd) return;
      setSelectedMatches([...selectedMatches, match]);
    }
  };
  return (
    <div
      key={match.id}
      className={clsx(
        "p-2 md:p-4 space-y-4 rounded border border-line bg-white",
        match.isAvailable ? "opacity-100" : "opacity-45 rotate-2 pointer-events-none",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs font-medium">
          <div className="h-7 w-7 min-w-7 bg-primary/10 text-primary center font-semibold rounded">
            {match.matchNo}
          </div>{" "}
          Match No.
        </div>
        <div className="space-x-1 text-xs font-medium">
         
          {match.status.toLowerCase() === "completed" ? (
            <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded">
              Completed
            </span>
          ) : (
            <span className="bg-amber-500/10 text-amber-600 px-2 py-1 rounded">
              Pending
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 text-sm md:text-base gap-6 w-full">
        <div className="truncate text-nowrap">{match.homeTeam}</div>
        <div className="center">
          <span className="font-semibold text-nowrap">
            {match.homeScore} : {match.awayScore}{" "}
          </span>
        </div>
        <div className="text-nowrap truncate text-right">{match.awayTeam}</div>
      </div>

      <div className="text-xs font-semibold flex items-center justify-between">
       

        <div
          onClick={handleToggle}
          className={clsx(
            "text-xs w-full flex items-center justify-between gap-1 cursor-pointer bg-gray-100 text-gray-600 rounded px-4 h-10",
            isSelected && "bg-primary text-white",
            !canAdd && "opacity-60 cursor-not-allowed",
          )}
          title={!canAdd ? "Nap allows only 3 games. Remove a selection or change bet type to Perming." : undefined}
        >
         {isSelected ? "Selected" : "Select Match"} {isSelected ? <CheckCircle size={16} /> : <Circle size={16} />}
        </div>
      </div>
    </div>
  );
}
