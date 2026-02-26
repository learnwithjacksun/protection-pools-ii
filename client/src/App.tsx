import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Home } from "@/pages";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Verify,
} from "./pages/auth";
import { Bets, Results, Stakes } from "./pages/main";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/stakes" element={<Stakes />} />
        <Route path="/results" element={<Results />} />
        <Route path="/bets" element={<Bets />} />
      </Routes>
    </>
  );
}
