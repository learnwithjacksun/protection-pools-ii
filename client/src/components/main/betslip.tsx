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
  const { selectedMatches, setSelectedMatches, betType, setBetType } = useMatchStore();
  const [stake, setStake] = useState("0.0");

  const handleBetTypeChange = (value: string) => {
    setBetType(value as "perming" | "nap");
  };

  const isNap = betType === "nap";
  const minSelections = 3;
  const maxSelectionsNap = 3;
  const maxSelectionsPerming = 15;
  const selectionCountValid = selectedMatches.length >= minSelections;
  const napCountValid = !isNap || selectedMatches.length === maxSelectionsNap;
  const napOverLimit = isNap && selectedMatches.length > maxSelectionsNap;
  const canSubmit =
    selectionCountValid &&
    napCountValid &&
    Number(stake) >= 100 &&
    Number(stake) <= 5000000 &&
    !isPlacingBet;
 


  const handleQuickStake = (amount: number) => {
    setStake(amount.toString());
  };
  const removeSelection = (id: string) => {
    const selections = selectedMatches.filter(x => x.id !== id)
    setSelectedMatches(selections)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedMatches.length < minSelections)
      return toast.error(`Select at least ${minSelections} games`);
    if (isNap && selectedMatches.length !== maxSelectionsNap)
      return toast.error("Nap requires exactly 3 games");
    if (!isNap && selectedMatches.length > maxSelectionsPerming)
      return toast.error(`Perming allows up to ${maxSelectionsPerming} games`);
    if (Number(stake) < 100) return toast.error("Minimum stake is 100");
    if (Number(stake) > 5000000) return toast.error("Maximum stake is 5,000,000");
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
          <div className="bg-primary/10 text-primary border border-primary/10 rounded p-4 md:p-2 text-xs space-y-2 md:space-y-1">
            <div className="font-semibold mb-1">Instructions</div>
            <ul className="list-disc list-inside space-y-0.5">
              <li><strong>Perming:</strong> Select 3 to 15 games.</li>
              <li><strong>Nap:</strong> Select exactly 3 games only.</li>
              <li>Less than 3 games is invalid for both types.</li>
            </ul>
            <div className="flex items-center justify-between gap-4 pt-1">
              <span>Maximum Selections:</span>
              <span className="font-semibold">{isNap ? "3 games" : "15 games"}</span>
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

          <SelectWithoutIcon
            label="Bet Type"
            options={[
              { value: "perming", label: "Perming" },
              { value: "nap", label: "Nap" },
            ]}
            value={betType}
            onChange={(e) => handleBetTypeChange(e.target.value)}
          />

          {napOverLimit && (
            <div className="bg-red-500/10 text-red-600 border border-red-500/20 rounded p-3 text-xs">
              Remove {selectedMatches.length - maxSelectionsNap} game(s) to place a Nap. Nap requires exactly 3 games.
            </div>
          )}

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
            disabled={!canSubmit}
          />
        </form>
      </div>
    </div>
  );
}
