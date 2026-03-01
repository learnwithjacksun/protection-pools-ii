import api from "@/config/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export interface AdminData {
  id: string;
  currentWeek: number;
}

export default function useAdmin() {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const getWeek = async (): Promise<AdminData | undefined> => {
    const response = await api.get<{
      success: boolean;
      data?: AdminData;
      message?: string;
    }>("/admin");
    if (!response.data.success || !response.data.data) {
      return undefined;
    }
    return response.data.data;
  };

  const updateData = async (week: number, id: string) => {
    setIsUpdating(true);
    try {
      const response = await api.patch<{
        success: boolean;
        message?: string;
      }>(`/admin/${id}`, {
        week: Number(week),
      });
      if (response.data.success) {
        toast.success(response.data.message ?? "Week updated");
        queryClient.invalidateQueries({ queryKey: ["admin"] });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          (error.response?.data as { message?: string })?.message ??
          "Failed to update week"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const { data: admin, isLoading, isError, error } = useQuery({
    queryKey: ["admin"],
    queryFn: getWeek,
  });

  return {
    admin,
    isLoading,
    isError,
    error,
    updateData,
    isUpdating,
  };
}
