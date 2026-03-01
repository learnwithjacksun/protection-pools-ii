import { useMatchStore } from "@/store";
import { Ticket, X } from "lucide-react";
import {
  ButtonWithLoader,
  InputWithoutIcon,
  SelectWithoutIcon,
} from "../ui";
import { useState } from "react";
import { useBets } from "@/hooks";
import { toast } from "sonner";

const QUICK_STAKE_AMOUNTS = [100, 500, 1000, 5000, 10000];

export default function Betslip() {
  const { placeBet, isPlacingBet } = useBets();
  const { selectedMatches, setSelectedMatches } = useMatchStore();
  const [stake, setStake] = useState("0.0")
  const [betType, setBetType] = useState("perming");
  const handleQuickStake = (amount: number) => {
    setStake(amount.toString());
  };
  const removeSelection = (id: string) => {
    const selections = selectedMatches.filter(x => x.id !== id)
    setSelectedMatches(selections)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedMatches.length === 0) return toast.error("Please select at least one match");
    if (Number(stake) < 100) return toast.error("Minimum stake is 100");
    if (Number(stake) > 5000000) return toast.error("Maximum stake is 5,000,000");
    if (!betType) return toast.error("Please select a bet type");
    if (isPlacingBet) return toast.error("Please wait for the bet to be placed");
    placeBet(selectedMatches, Number(stake), betType);
  }
  return (
    <div className="bg-white">
      <div className="py-4 w-[90%] mx-auto space-y-4">
        <h3 className="flex items-center gap-2 font-semibold text-lg border-b border-line pb-2">
          <Ticket size={18} className="text-primary" /> Betslip
        </h3>
        {/* <form className="flex items-center gap-2">
          <div className="flex-1">
            <InputWithIcon
              icon={<Search size={20} />}
              type="text"
              placeholder="Enter Bookin Code"
              className="bg-gray-100"
            />
          </div>
          <ButtonWithLoader
            type="submit"
            initialText="Load"
            loadingText="Loading..."
            className="px-6 h-[43px] btn-primary rounded"
          />
        </form> */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-amber-500/10 text-amber-600 border border-amber-500/10 rounded p-4 md:p-2 text-xs space-y-2 md:space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span>Maximum Selections:</span>
              <span className="font-semibold">15 games</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span>Minimum Stake:</span>
              <span className="font-semibold">&#8358; 100</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Maximum Stake:</span>
              <span className="font-semibold">&#8358; 5,000,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="" className="text-sm text-muted font-medium">
              Selected Games
            </label>
            {selectedMatches.length === 0 && (
              <div className="bg-gray-100 p-2 rounded center min-h-30 mt-1">
                <p className="text-sm text-muted">No game selected</p>
              </div>
            )}
            {selectedMatches.length > 0 && selectedMatches && (
              <div className="space-y-1">
                {selectedMatches.map(x => (
                  <div key={x.id} className="flex items-center gap-2 pb-1 last:border-none border-b border-line">
                    <div className="text-primary rounded text-sm font-medium h-7 w-7 min-w-7 center bg-primary/10">{x.matchNo}</div>
                    <div className="flex-1 text-sm">
                      <span className="truncate text-nowrap">{x.homeTeam}</span> : <span className="truncate text-nowrap">{x.awayTeam}</span>
                    </div>
                    <button onClick={() => removeSelection(x.id)} type="button" className="text-red-600">
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <SelectWithoutIcon
            label="Bet Type"
            options={[
              { value: "perming", label: "Perming" },
              { value: "nap", label: "Nap" },
            ]}
            value={betType}
            onChange={(e) => setBetType(e.target.value)}
          />
          <div className="space-y-2">
            <InputWithoutIcon
              type="number"
              label="Stake (₦)"
              placeholder="200"
              name="stake"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {QUICK_STAKE_AMOUNTS.map((amount) => (
                <button
                  type="button"
                  key={amount}
                  onClick={() => handleQuickStake(amount)}
                  className={`px-3 py-1 rounded font-space font-medium text-xs transition-all ${stake === amount.toString()
                      ? "bg-primary text-white border border-primary"
                      : "bg-foreground border border-line text-main hover:border-primary/30 hover:bg-primary/5"
                    }`}
                >
                  &#8358;{amount}
                </button>
              ))}
            </div>
          </div>

          <ButtonWithLoader
            initialText="Stake Now"
            loadingText="Staking..."
            className="w-full btn-primary h-[43px] rounded disabled:opacity-50 disabled:pointer-events-none"
            loading={isPlacingBet}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
