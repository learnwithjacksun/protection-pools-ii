import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Home } from "@/pages/main";
import { Login } from "./pages/auth";
import { Matches, AddMatch, EditMatch } from "./pages/main/matches";
import { UserDetails, UsersPage } from "./pages/main/users";
import RouteGuard from "./pages/route-guard";
import { useAuth } from "./hooks";
import { useEffect } from "react";

export default function App() {
  const { checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RouteGuard />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/matches">
            <Route index element={<Matches />} />
            <Route path="add" element={<AddMatch />} />
            <Route path="edit/:id" element={<EditMatch />} />
          </Route>
          <Route path="/users">
            <Route index element={<UsersPage />} />
            <Route path="details/:id" element={<UserDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
