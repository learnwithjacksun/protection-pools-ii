import type { LoginSchema } from "@/schemas/auth";
import { useAuthStore } from "@/store";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/config/api";
import { toast } from "sonner";
import axios from "axios";

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
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      useAuthStore.persist.clearStorage();
      navigate("/");
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, setUser]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await api.get("/auth/check");
      if (response.data.success) {
        setUser(response.data.data);
        return response.data.data;
      }
    } catch {
      setUser(null);
      useAuthStore.persist.clearStorage();
      await logout();
      return null;
    }
  }, [logout, setUser]);

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
