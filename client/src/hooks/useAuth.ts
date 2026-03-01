import api from "@/config/api";
import { useAuthStore } from "@/store";
import axios from "axios";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifySchema,
} from "@/schemas/auth";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const login = useCallback(
    async (data: LoginSchema) => {
      setLoading(true);
      try {
        const response = await api.post("/auth/login", data);
        if (response.data.success) {
          setUser(response.data.data);
          toast.success("Login successful");
          navigate("/bets");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const msg = error.response?.data?.message;
          toast.error(msg || "Something went wrong");
          if (error.response?.status === 403 && error.response?.data?.requiresVerification) {
            const email = error.response?.data?.data?.email;
            navigate(`/verify${email ? `?email=${encodeURIComponent(email)}` : ""}`);
          }
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser]
  );

  const register = useCallback(
    async (data: RegisterSchema) => {
      setLoading(true);
      try {
        const response = await api.post("/auth/register", {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        });
        if (response.data.success) {
          setUser(response.data.data);
          toast.success("Check your email for the verification code");
          navigate(`/verify?email=${encodeURIComponent(data.email)}`);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Registration failed");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      useAuthStore.persist?.clearStorage?.();
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Logout failed");
      } else {
        toast.error("Something went wrong");
      }
      setUser(null);
      useAuthStore.persist?.clearStorage?.();
      navigate("/");
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
      return null;
    } catch {
      setUser(null);
      useAuthStore.persist?.clearStorage?.();
      return null;
    }
  }, [setUser]);

  const verifyOtp = useCallback(
    async (data: VerifySchema, email: string) => {
      setLoading(true);
      try {
        const response = await api.post("/auth/verify-otp", { otp: data.code, email });
        if (response.data.success) {
          if (response.data.user) setUser(response.data.user);
          toast.success("Email verified successfully");
          navigate("/bets");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Verification failed");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser]
  );

  const resendOtp = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/resend-otp", { email });
      if (response.data.success) {
        toast.success("Verification code sent to your email");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to resend code");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (data: ForgotPasswordSchema) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/forgot-password", { email: data.email });
      if (response.data.success) {
        toast.success(response.data.message || "If your email exists, a reset link will be sent");
        navigate("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const resetPassword = useCallback(
    async (token: string, data: ResetPasswordSchema) => {
      setLoading(true);
      try {
        const response = await api.post("/auth/reset-password", {
          token,
          newPassword: data.password,
        });
        if (response.data.success) {
          toast.success("Password reset successfully");
          navigate("/login");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Reset failed");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
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
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Change password failed");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    user,
    login,
    register,
    logout,
    checkAuth,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    changePassword,
  };
}
