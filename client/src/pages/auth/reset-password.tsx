import { AuthLayout } from "@/layouts";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ResetPasswordSchema, resetPasswordSchema } from "@/schemas/auth";
import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { resetPassword, loading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!token) toast.error("Invalid or missing reset link");
  }, [token]);

  const onSubmit = (data: ResetPasswordSchema) => {
    if (!token) {
      toast.error("Invalid or missing reset link");
      return;
    }
    resetPassword(token, data);
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password and confirm it">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <InputWithoutIcon
          type="password"
          label="Password"
          placeholder="Enter Password"
          className="bg-gray-100"
          {...register("password")}
          error={errors.password?.message}
        />
        <InputWithoutIcon
          type="password"
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          className="bg-gray-100"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <ButtonWithLoader
          initialText="Reset Password"
          loadingText="Loading..."
          loading={loading}
          type="submit"
          className="w-full btn-primary h-11 rounded-lg"
          disabled={!token}
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
