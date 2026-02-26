import { useAuth } from "@/hooks";
import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

export default function RouteGuard() {
  const { user, loading } = useAuth();

  return loading ? (
    <div className="min-h-[100dvh] center">
      <div className="flex items-center gap-2">
        <Loader size={20} className="text-yellow-600 animate-spin" />
        <span className="font-semibold text-sm">Loading...</span>
      </div>
    </div>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
