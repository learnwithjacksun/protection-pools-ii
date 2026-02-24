import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Home } from "@/pages/main";
import { Login } from "./pages/auth";
import { Matches, AddMatch, EditMatch } from "./pages/main/matches";
import { UserDetails, UsersPage } from "./pages/main/users";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Login />} />
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
      </Routes>
    </>
  );
}
