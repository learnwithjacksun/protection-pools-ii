import { AuthLayout } from "@/layouts";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import InputCheck from "@/components/ui/input-check";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterSchema, registerSchema } from "@/schemas/auth";
import { toast } from "sonner";

export default function Register() {
  const [isAgree, setIsAgree] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = (data: RegisterSchema) => {
    if(!isAgree) return toast.error("Please agree to the terms and conditions");
    console.log(data);
  }
  return (
    <AuthLayout
      title="Join the Protection Pool"
      subtitle="Create an account to secure stakes and win big"
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <InputWithoutIcon
          type="text"
          label="Full Name"
          placeholder="Enter Full Name"
          className="bg-gray-100"
          {...register("name")}
          error={errors.name?.message}
        />
        <InputWithoutIcon
          type="email"
          label="E-mail Address"
          placeholder="Enter Email"
          className="bg-gray-100"
          {...register("email")}
          error={errors.email?.message}
        />
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
        <InputWithoutIcon
          type="password"
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          className="bg-gray-100"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <div className="flex items-center gap-2 cursor-pointer">
          <InputCheck
            checked={isAgree}
            onChange={() => setIsAgree(!isAgree)}
            id="agree"
          />{" "}
          <label htmlFor="agree" className="text-sm text-primary font-medium">
            I am agree that I am above +18{" "}
          </label>
        </div>
        <ButtonWithLoader
          initialText="Register"
          loadingText="Loading..."
          type="submit"
          className="w-full btn-primary h-11 rounded-lg"
        />
        <div className="text-center">
          <p className="text-sm text-main">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
