import type { LoginSchema } from "@/schemas/auth";
import { useAuthStore } from "@/store";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/config/api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function useAuth() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data: LoginSchema) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/admin/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        setUser(response.data.data);

        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error: any | AxiosError) {
      console.log(error);
      if (error as AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      useAuthStore.persist.clearStorage();
      navigate("/");
    } catch (error: any | AxiosError) {
      if (error as AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = useCallback(async () => {
    try {
      const response = await api.get("/auth/check");
      if (response.data.success) {
        setUser(response.data.data);
        return response.data.data;
      }
    } catch (error: any | AxiosError) {
      setUser(null);
      useAuthStore.persist.clearStorage();
      await logout();
      return null;
    }
  }, [setUser]);

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      if (response.data.success) {
        toast.success("Password changed successfully");
        return response.data;
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    checkAuth,
    changePassword,
  };
}
