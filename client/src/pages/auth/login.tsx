import { AuthLayout } from "@/layouts";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginSchema, loginSchema } from "@/schemas/auth";

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    })

    const onSubmit = (data: LoginSchema) => {
        console.log(data);
    }
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to stake and manage your bets"
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <InputWithoutIcon
          type="tel"
          label="Phone Number"
          placeholder="Enter Phone Number"
          className="bg-gray-100"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <InputWithoutIcon
          type="password"
          label="Password"
          placeholder="Enter Password"
          className="bg-gray-100"
          {...register("password")}
          error={errors.password?.message}
        />
        <div>
          <Link to="/forgot-password" className="text-sm text-primary underline font-medium">
            Forgot Password?
          </Link>
        </div>
        <ButtonWithLoader
          initialText="Login"
          loadingText="Loading..."
          type="submit"
          className="w-full btn-primary h-11 rounded-lg"
        />
        <div className="text-center">
          <p className="text-sm text-main">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
