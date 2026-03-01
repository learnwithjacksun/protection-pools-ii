import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";


export default function useBets() {


    const getUserBets = async () => {
        const response = await api.get("/bets");
        if (response.data.success) {
            return response.data.data;
        }
        return null
    }




    const { data: bets, isLoading: fetchingBets } = useQuery<IBet[]>({
        queryKey: ["bets"],
        queryFn: getUserBets,
    });


    return {
        bets,
        fetchingBets
    }
}