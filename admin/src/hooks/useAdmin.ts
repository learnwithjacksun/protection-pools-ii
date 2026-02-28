import api from "@/config/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function useAdmin() {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const getWeek = async () => {
    const response = await api.get("/admin");
    return response.data.data;
  };

  const updateData = async (week: number, id: string) => {
    setIsUpdating(true);
    try {
      const response = await api.patch(`/admin/${id}`, {
        week: Number(week),
      });
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["admin"] });
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

  const { data: admin, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: getWeek,
  });

  return {
    admin,
    isLoading,
    updateData,
    isUpdating,
  };
}
