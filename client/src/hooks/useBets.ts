import api from "@/config/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAdmin from "./useAdmin";

export default function useBets() {
    const { admin } = useAdmin();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [isPlacingBet, setIsPlacingBet] = useState(false);

    const getUserBets = async () => {
        const response = await api.get("/bets/user");
        if (response.data.success) {
            return response.data.data;
        }
        return null
    }


    const placeBet = async (matches: IMatch[], stakeAmount: number, betType: string) => {
        setIsPlacingBet(true);
        try {
            const response = await api.post("/bets", {
                week: admin?.currentWeek,
                matches: matches.map((m) => m.id),
                stakeAmount,
                betType
            });
            if (response.data.success) {
                toast.success("Bet placed successfully");
                queryClient.invalidateQueries({ queryKey: ["bets"] });
                navigate("/bets");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setIsPlacingBet(false);
        }
    }

    const { data: bets, isLoading: fetchingBets } = useQuery<IBet[]>({
        queryKey: ["bets"],
        queryFn: getUserBets,
    });


    return {
        bets,
        fetchingBets,
        placeBet,
        isPlacingBet
    }
}