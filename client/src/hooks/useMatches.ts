import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export default function useMatches() {
  const getMatches = async () => {
    const response = await api.get("/matches");
    if (response.data.success) {
      return response.data.data;
    }
  };

  const { data: matches, isLoading: fetchingMatches } = useQuery<IMatch[]>({
    queryKey: ["matches"],
    queryFn: getMatches,
  });

  return {
    matches,
    fetchingMatches,
  };
}
