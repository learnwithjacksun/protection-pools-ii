import { AuthLayout } from "@/layouts";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { useSearchParams } from "react-router-dom";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  return (
    <AuthLayout
      title="Email Verification"
      subtitle={`A 6-digit code has been sent to your email address: ${email}`}
    >
      <form className="space-y-6">
        <InputWithoutIcon
          type="number"
          label="Enter Code"
          placeholder="- - - - - -"
          className="bg-gray-100"
        />
        <ButtonWithLoader
          initialText="Verify"
          loadingText="Loading..."
          type="submit"
          className="w-full btn-primary h-11 rounded-lg"
        />
        <div className="center gap-2 flex-wrap">
          <p className="text-sm text-main">Didn't receive a code? </p>
          <ButtonWithLoader
            initialText="Resend"
            loadingText="Loading..."
            type="button"
            className="text-primary"
          />
        </div>
      </form>
    </AuthLayout>
  );
}
