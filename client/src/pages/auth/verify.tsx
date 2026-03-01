import { AuthLayout } from "@/layouts";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type VerifySchema, verifySchema } from "@/schemas/auth";
import { useAuth } from "@/hooks";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { verifyOtp, resendOtp, loading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<VerifySchema>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  return (
    <AuthLayout
      title="Email Verification"
      subtitle={email ? `A 6-digit code has been sent to ${email}` : "Enter the 6-digit code sent to your email."}
    >
      <form className="space-y-6" onSubmit={handleSubmit((data) => verifyOtp(data, email))}>
        <InputWithoutIcon
          type="text"
          inputMode="numeric"
          maxLength={6}
          autoComplete="one-time-code"
          label="Enter Code"
          placeholder="000000"
          className="bg-gray-100 font-mono text-center tracking-[0.5em]"
          {...register("code")}
          error={errors.code?.message}
        />
        <ButtonWithLoader
          initialText="Verify"
          loadingText="Verifying..."
          loading={loading}
          type="submit"
          className="w-full btn-primary h-11 rounded-lg"
        />
        <div className="center gap-2 flex-wrap">
          <p className="text-sm text-main">Didn't receive a code?</p>
          <ButtonWithLoader
            initialText="Resend"
            loadingText="Sending..."
            loading={loading}
            type="button"
            onClick={() => resendOtp(email)}
            className="text-primary underline"
          />
        </div>
      </form>
    </AuthLayout>
  );
}
