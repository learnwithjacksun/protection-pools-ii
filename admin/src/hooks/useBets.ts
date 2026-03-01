import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";


export default function useBets() {
    const [bet, setBet] = useState<IBet | null>(null);
    const [fetchingBet, setFetchingBet] = useState(false);

    const getUserBets = async () => {
        const response = await api.get("/bets");
        if (response.data.success) {
            return response.data.data;
        }
        return null
    }

    const getBetByBookingCode = useCallback(async (bookingCode: string) => {
        setFetchingBet(true);
        try {
            const response = await api.get(`/bets/${bookingCode}`);
            if (response.data.success) {
                setBet(response.data.data);
                toast.success("Bet found successfully");
                return true
            }
            return false
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error("Something went wrong");
            }
            return false
        } finally {
            setFetchingBet(false);
        }
    }, []);

    const [updatingStatus, setUpdatingStatus] = useState(false);
    const updateBetStatus = async (betId: string, status: "awaiting" | "done") => {
        setUpdatingStatus(true);
        try {
            const response = await api.patch(`/bets/${betId}/status`, { status });
            if (response.data.success) {
                toast.success("Bet status updated successfully");
                return response.data.data;
            }
            return null;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to update status");
            } else {
                toast.error("Something went wrong");
            }
            return null;
        } finally {
            setUpdatingStatus(false);
        }
    };



    const { data: bets, isLoading: fetchingBets } = useQuery<IBet[]>({
        queryKey: ["bets"],
        queryFn: getUserBets,
    });




    return {
        bets,
        fetchingBets,
        bet,
        fetchingBet,
        getBetByBookingCode,
        updateBetStatus,
        updatingStatus,
    }
}