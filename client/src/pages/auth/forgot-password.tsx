import { AuthLayout } from "@/layouts";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ForgotPasswordSchema, forgotPasswordSchema } from "@/schemas/auth";
import { useAuth } from "@/hooks";

export default function ForgotPassword() {
  const { forgotPassword, loading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address, and we'll send you a link to reset it."
    >
      <form className="space-y-6" onSubmit={handleSubmit((data) => forgotPassword(data))}>
        <InputWithoutIcon
          type="email"
          label="E-mail Address"
          placeholder="Enter Email"
          className="bg-gray-100"
          {...register("email")}
          error={errors.email?.message}
        />
        <ButtonWithLoader
          initialText="Reset Password"
          loadingText="Loading..."
          loading={loading}
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
