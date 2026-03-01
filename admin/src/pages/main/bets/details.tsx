import { DashboardLayout } from "@/layouts";
import { GoBack } from "@/components/ui";
import { useBets } from "@/hooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { formatDate } from "@/helpers/formatDate";
import { ButtonWithLoader } from "@/components/ui";
import { Loader2, Ticket, User, Calendar, Hash } from "lucide-react";

export default function BetDetails() {
  const { bookingCode } = useParams<{ bookingCode: string }>();
  const {
    bet,
    fetchingBet,
    getBetByBookingCode,
    updateBetStatus,
    updatingStatus,
  } = useBets();

  useEffect(() => {
    if (bookingCode) {
      getBetByBookingCode(bookingCode);
    }
  }, [bookingCode, getBetByBookingCode]);

  const handleMarkAsDone = async () => {
    if (!bet?.id) return;
    const updated = await updateBetStatus(bet.id, "done");
    if (updated) {
      getBetByBookingCode(bookingCode ?? "");
    }
  };

  const user = bet?.user && typeof bet.user === "object" ? bet.user : null;
  const matches = Array.isArray(bet?.matches) ? bet.matches : [];

  if (fetchingBet && !bet) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[40vh] gap-2 text-muted">
          <Loader2 size={24} className="animate-spin" />
          <span>Loading bet...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (!bet) {
    return (
      <DashboardLayout>
        <GoBack title="Bet Details" />
        <div className="bg-white border border-line rounded-lg p-8 text-center text-muted">
          <p>Bet not found or not loaded yet.</p>
        </div>
      </DashboardLayout>
    );
  }

  const isDone = bet.status === "done";

  return (
    <DashboardLayout>
      <GoBack title="Bet Details" />

      <div className="space-y-6">
        {/* Header card */}
        <div className="bg-white border border-line rounded-xl p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Ticket size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-mono text-primary">
                  {bet.bookingCode}
                </h1>
                <span
                  className={`inline-block mt-1 text-xs font-medium px-2.5 py-1 rounded capitalize ${isDone ? "bg-green-500/10 text-green-600" : "bg-amber-500/10 text-amber-600"
                    }`}
                >
                  {bet.status}
                </span>
              </div>
            </div>
            {!isDone && (
              <ButtonWithLoader
                initialText="Mark as done"
                loadingText="Updating..."
                loading={updatingStatus}
                onClick={handleMarkAsDone}
                disabled={updatingStatus}
                className="btn-primary h-11 px-6 rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Bet info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-line rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-muted mb-4 flex items-center gap-2">
              <Hash size={16} />
              Bet information
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Stake</dt>
                <dd className="font-semibold font-space">₦{Number(bet.stakeAmount).toLocaleString()}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Type</dt>
                <dd className="font-medium capitalize">{bet.betType}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Week</dt>
                <dd className="font-medium">{bet.week}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Created</dt>
                <dd className="text-muted">{formatDate(new Date(bet.createdAt ?? ""))}</dd>
              </div>
            </dl>
          </div>

          {user && (
            <div className="bg-white border border-line rounded-xl p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-muted mb-4 flex items-center gap-2">
                <User size={16} />
                Better
              </h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted text-xs">Name</dt>
                  <dd className="font-medium">{(user as { name?: string }).name ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted text-xs">Email</dt>
                  <dd className="font-medium">{(user as { email?: string }).email ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted text-xs">Phone</dt>
                  <dd className="font-medium">{(user as { phone?: string }).phone ?? "—"}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        {/* Matches */}
        <div className="bg-white border border-line rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-muted mb-4 flex items-center gap-2">
            <Calendar size={16} />
            Selected matches ({matches.length})
          </h2>
          {matches.length === 0 ? (
            <p className="text-sm text-muted">No match details available.</p>
          ) : (
            <ul className="space-y-3 overflow-x-auto max-w-full hide-scrollbar">
              {matches.map((match: IMatch, index: number) => (
                <li
                  key={match.id ?? index}
                  className="flex items-center gap-4 py-3 px-4 rounded-lg bg-gray-50 border border-line"
                >
                  <span className="flex-shrink-0 h-8 w-8 rounded bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center">
                    {match.matchNo ?? index + 1}
                  </span>
                  <div className="flex-1 min-w-0 text-sm truncate">
                    <span className="font-medium truncate">{match.homeTeam}</span>
                    <span className="text-muted mx-2">vs</span>
                    <span className="font-medium truncate">{match.awayTeam}</span>
                  </div>
                  {match.status && (
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded capitalize ${String(match.status).toLowerCase() === "completed"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-amber-500/10 text-amber-600"
                        }`}
                    >
                      {match.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
