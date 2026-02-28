import api from "@/config/api";
import type { EditUserSchema } from "@/schemas/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getUsers = async () => {
    const response = await api.get("/users");
    if (response.data.success) {
      return response.data.data;
    }
  };

  const updateUser = async (
    id: string,
    data: EditUserSchema,
    isActive: boolean,
    isAdmin: boolean,
  ) => {
    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        isActive,
        isAdmin,
      };
      const response = await api.patch(`/users/update/${id}`, payload);
      if (response.data.success) {
        toast.success("User updated successfully");
      }
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/users/delete/${id}`);
      if (response.data.success) {
        toast.success("User deleted successfully");
        navigate("/users");
        queryClient.invalidateQueries({ queryKey: ["users"] });
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

  const { data: users, isLoading: fetchingUsers } = useQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    users,
    fetchingUsers,
    isLoading,
    updateUser,
    deleteUser,
    isDeleting,
  };
}
