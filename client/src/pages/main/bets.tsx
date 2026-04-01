import { MainLayout } from "@/layouts";
import { useBets } from "@/hooks";
import { Check, Copy, Loader, Printer, Ticket } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatSlipDate(isoDate?: string) {
  if (!isoDate) return new Date().toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" });
  const d = new Date(isoDate);
  return d.toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" });
}

function betTypeLabel(bet: IBet) {
  const n = bet.matches?.length ?? 0;
  const stake = bet.stakeAmount;
  if (bet.betType === "nap") return `NAP F${stake}`;
  return `PERM ${n} F${stake}`;
}

const SLIP_STYLES = `
  .slip-receipt { font-family: 'Courier New', Courier, monospace; width: 100%; min-height: 100%; margin: 0; padding: 14px 12px; background: #fff; color: #000; font-size: 12px; line-height: 1.5; box-sizing: border-box; }
  .slip-receipt * { box-sizing: border-box; }
  .slip-receipt .slip-line { border: none; border-top: 1px dashed #333; margin: 8px 0; }
  .slip-receipt .slip-title { font-weight: bold; font-size: 14px; text-align: center; margin: 4px 0; }
  .slip-receipt .slip-sub { text-align: center; font-size: 10px; color: #444; margin-bottom: 4px; }
  .slip-receipt .slip-row { display: flex; justify-content: space-between; margin: 3px 0; gap: 8px; }
  .slip-receipt .slip-label { font-weight: bold; flex-shrink: 0; }
  .slip-receipt .slip-value { word-break: break-word; }
  .slip-receipt .slip-forecast { word-break: break-all; }
  .slip-receipt .slip-disclaimer { font-size: 10px; margin-top: 10px; text-align: center; }
  .slip-receipt .slip-matches-title { font-weight: bold; margin: 8px 0 4px 0; }
  .slip-receipt .slip-match-row { display: flex; align-items: center; margin: 4px 0; padding: 4px 0; border-bottom: 1px solid #eee; }
  .slip-receipt .slip-match-no { font-weight: bold; min-width: 28px; height: 22px; display: inline-flex; align-items: center; justify-content: center; background: #f0f0f0; border: 1px solid #333; }
`;

function PrintableSlip({ bet }: { bet: IBet }) {
  const forecast = bet.matches?.map((m) => m.matchNo).sort((a, b) => a - b).join("-") ?? "";
  const slipDate = formatSlipDate(bet.createdAt);
  const typeLabel = betTypeLabel(bet);

  const slipStyle: React.CSSProperties = {
    fontFamily: "'Courier New', Courier, monospace",
    width: "100%",
    minHeight: "100%",
    margin: 0,
    padding: "14px 12px",
    background: "#fff",
    color: "#000",
    fontSize: "12px",
    lineHeight: 1.5,
    boxSizing: "border-box",
  };

  const sortedMatches = [...(bet.matches ?? [])].sort((a, b) => a.matchNo - b.matchNo);

  return (
    <div className="slip-receipt" style={slipStyle}>
      <style>{SLIP_STYLES}</style>
      <div className="slip-inner">
        <hr className="slip-line" />
        <div className="slip-title">PROTECTION POOLS</div>
        <div className="slip-sub">for personal use only</div>
        <hr className="slip-line" />
        <div className="slip-row">
          <span className="slip-label">Week#:</span>
          <span className="slip-value">{bet.week}</span>
        </div>
        <div className="slip-row">
          <span className="slip-label">Date:</span>
          <span className="slip-value">{slipDate}</span>
        </div>
        <div className="slip-row">
          <span className="slip-label">Type:</span>
          <span className="slip-value">{typeLabel}</span>
        </div>
        <div className="slip-row">
          <span className="slip-label">Amount:</span>
          <span className="slip-value">{bet.stakeAmount}</span>
        </div>
        <div className="slip-row">
          <span className="slip-label">Forecast:</span>
          <span className="slip-value slip-forecast">{forecast || "—"}</span>
        </div>
        {sortedMatches.length > 0 && (
          <>
            <div className="slip-matches-title">Selections (match no.)</div>
            {sortedMatches.map((match) => (
              <div key={match.id} className="slip-match-row">
                <span className="slip-match-no">{match.matchNo}</span>
              </div>
            ))}
          </>
        )}
        <div className="slip-row">
          <span className="slip-label">CP#:</span>
          <span className="slip-value">{bet.bookingCode}</span>
        </div>
        <div className="slip-row">
          <span className="slip-label">S/N:</span>
          <span className="slip-value" style={{ fontSize: "9px", wordBreak: "break-all" }}>{bet.id}</span>
        </div>
        <hr className="slip-line" />
        <div className="slip-disclaimer">Bet after result is void. I am over 18 years old.</div>
        <hr className="slip-line" />
        <div className="slip-title">PROTECTION POOLS</div>
        <div className="slip-sub">for personal use only</div>
        <hr className="slip-line" />
      </div>
    </div>
  );
}

function BetCard({ bet }: { bet: IBet }) {
  const [isCopyingBookingCode, setIsCopyingBookingCode] = useState(false);
  const slipRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: slipRef,
    documentTitle: `Bet-Slip-${bet.bookingCode}`,
    pageStyle: `
      @page { size: auto; margin: 10mm; }
      body { margin: 0; padding: 0; width: 100%; min-height: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `,
    onAfterPrint: () => {},
  });

  const handleCopyBookingCode = () => {
    navigator.clipboard.writeText(bet.bookingCode);
    toast.success("Booking code copied to clipboard");
    setIsCopyingBookingCode(true);
    setTimeout(() => setIsCopyingBookingCode(false), 1000);
  };

  return (
    <>
      <article className="bg-white border border-line rounded-lg overflow-hidden">
        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 center rounded bg-primary/10">
                <Ticket size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted capitalize tracking-wide">Booking code</p>
                <p className="font-semibold font-space flex items-center gap-1">
                  #{bet.bookingCode}{" "}
                  <span
                    className="cursor-pointer"
                    onClick={handleCopyBookingCode}
                    title="Copy to clipboard"
                  >
                    {isCopyingBookingCode ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} className="text-muted" />
                    )}
                  </span>
                </p>
              </div>
            </div>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                bet.status === "done"
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
              }`}
            >
              {bet.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted">Week</p>
              <p className="font-medium">{bet.week}</p>
            </div>
            <div>
              <p className="text-muted">Stake</p>
              <p className="font-medium">{formatCurrency(bet.stakeAmount)}</p>
            </div>
            <div>
              <p className="text-muted">Bet type</p>
              <p className="font-medium capitalize">{bet.betType}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted uppercase tracking-wide mb-2">Selections</p>
            <ul className="space-y-1.5">
              {bet.matches?.map((match) => (
                <li
                  key={match.id}
                  className="flex items-center gap-2 text-sm py-1.5 border-b border-line last:border-0"
                >
                  <span className="text-primary-2 rounded text-sm font-medium h-7 w-7 min-w-7 center bg-primary-2/10">
                    {match.matchNo}
                  </span>
                  <span className="truncate">
                    {match.homeTeam} vs {match.awayTeam}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => handlePrint()}
            className="btn btn-primary text-sm h-10 w-full rounded gap-2"
          >
            <Printer size={18} />
            Print
          </button>
        </div>
      </article>

      {/* Printable slip: ref must NOT be on the off-screen wrapper, or the clone keeps left:-9999px and prints empty */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          overflow: "visible",
        }}
      >
        <div ref={slipRef} style={{ width: "100%", minHeight: "100%", background: "#fff" }}>
          <PrintableSlip bet={bet} />
        </div>
      </div>
    </>
  );
}

export default function Bets() {
  const { bets, fetchingBets } = useBets();

  return (
    <MainLayout>
      <section className="main py-6">
        <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 text-center">My Bets</h2>

        {fetchingBets && (
          <div className="flex items-center justify-center gap-4 h-48">
            <Loader size={20} className="animate-spin text-primary" />
            <span className="text-muted">Fetching bets...</span>
          </div>
        )}

        {!fetchingBets && (!bets || bets.length === 0) && (
          <div className="bg-white border border-line rounded-lg p-8 text-center">
            <Ticket size={48} className="mx-auto text-muted mb-3 opacity-60" />
            <p className="text-main font-medium">No bets yet</p>
            <p className="text-sm text-muted mt-1">
              Place a bet from the matches page to see it here.
            </p>
          </div>
        )}

        {!fetchingBets && bets && bets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bets.map((bet) => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
