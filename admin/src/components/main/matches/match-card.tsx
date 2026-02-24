import { Trash } from "iconsax-reactjs";
import { Link } from "react-router-dom";

export default function MatchCard({ match }: { match: IMatch }) {
  return (
    <div
      key={match.id}
      className="p-4 space-y-4 rounded border border-line bg-white"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="h-8 w-8 min-w-8 bg-primary/10 text-primary center font-semibold rounded">
          {match.matchNo}
        </div>
        <div className="text-sm font-semibold">Week: {match.week}</div>
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

       <div className="flex items-center justify-between mt-4 bg-gray-500/5 p-2 rounded gap-2 text-xs font-semibold">
                    {match.isActive ? (
                        <span className="bg-violet-500/10 text-violet-600 px-2 py-1 rounded">Active</span>
                    ) : (
                        <span className="bg-gray-500/10 text-gray-600 px-2 py-1 rounded">Inactive</span>
                    )}
                    {match.status.toLowerCase() === "completed" ? (
                        <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded">Completed</span>
                    ) : (
                        <span className="bg-amber-500/10 text-amber-600 px-2 py-1 rounded">Pending</span>
                    )}
                </div>

      <div className="flex gap-4">
        <Link
          to={`/matches/edit/${match.id}`}
          className="text-sm btn font-semibold border border-gray-300 flex-1 h-9"
        >
          Edit
        </Link>
        <button className="bg-red-500/10 text-red-500 rounded flex-1 px-4 h-9">
          <Trash variant="Bold" size={18} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
