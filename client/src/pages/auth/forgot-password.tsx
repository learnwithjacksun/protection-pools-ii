import { AuthLayout } from "@/layouts";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address, and we'll send you a link to reset it."
    >
      <form className="space-y-6">
        <InputWithoutIcon
          type="email"
          label="E-mail Address"
          placeholder="Enter Email"
          className="bg-gray-100"
        />
        <ButtonWithLoader
          initialText="Reset Password"
          loadingText="Loading..."
          type="submit"
          className="w-full btn-primary h-11 rounded-lg"
        />
        <div className="text-center">
          <p className="text-sm text-main">
            Remembered your password?{" "}
            <Link to="/login" className="text-primary font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
