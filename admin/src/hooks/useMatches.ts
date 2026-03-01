import api from "@/config/api";
import type { CreateMatchSchema, EditMatchSchema } from "@/schemas/matches";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useMatches() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getMatches = async () => {
    const response = await api.get("/matches");
    if (response.data.success) {
      return response.data.data;
    }
  };

  const createMatch = async (data: CreateMatchSchema, isAvailable: boolean, week: number) => {
    setIsCreating(true);
    try {
      const payload = {
        week: Number(week),
        homeTeam: data.homeTeam,
        awayTeam: data.awayTeam,
        isAvailable,
      };
      const response = await api.post("/matches", payload);
      if (response.data.success) {
        toast.success("Match created successfully");
        queryClient.invalidateQueries({ queryKey: ["matches"] });
        navigate("/matches");
      }
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const updateMatch = async (
    id: string,
    data: EditMatchSchema,
    isAvailable: boolean,
    status: string,
    week: number,
  ) => {
    setIsUpdating(true);
    try {
      const payload = {
        week: Number(week),
        homeTeam: data.homeTeam,
        awayTeam: data.awayTeam,
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        isAvailable,
        status,
      };
      const response = await api.patch(`/matches/update/${id}`, payload);
      if (response.data.success) {
        toast.success("Match updated successfully");
        queryClient.invalidateQueries({ queryKey: ["matches"] });
        navigate("/matches");
      }
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteMatch = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/matches/delete/${id}`);
      if (response.data.success) {
        toast.success("Match deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["matches"] });
      }
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const { data: matches, isLoading: fetchingMatches } = useQuery<IMatch[]>({
    queryKey: ["matches"],
    queryFn: getMatches,
  });

  return {
    matches,
    fetchingMatches,
    createMatch,
    updateMatch,
    deleteMatch,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
