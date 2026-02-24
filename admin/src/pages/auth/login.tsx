import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { ShieldSecurity } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/auth";

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: LoginSchema) => {
        console.log(data);
    }
  return (
    <div className="bg-gradient-to-b to-primary-2 min-h-[100dvh] pt-20">
      <div className="max-w-[480px] w-[90%] space-y-4 mx-auto bg-white px-4 pt-6 pb-4 rounded-2xl shadow-xl">
        <div className="w-fit mx-auto">
          <ShieldSecurity
            variant="Bulk"
            className="text-primary-2"
            size={90}
          />
        </div>
        <div className="text-center border-b border-line pb-4">
          <h1 className="text-xl font-bold">Administrator Login</h1>
          <p className="text-sm text-muted">
            Sign in to manage matches and wins
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <InputWithoutIcon
            type="email"
            label="E-mail Address"
            placeholder="Enter Email"
            className="bg-secondary"
            {...register("email")}
            error={errors.email?.message}
          />
          <InputWithoutIcon
            type="password"
            label="Password"
            placeholder="Enter Password"
            className="bg-secondary"
            {...register("password")}
            error={errors.password?.message}
          />
          <ButtonWithLoader
            initialText="Continue"
            loadingText="Loading..."
            type="submit"
            className="w-full btn-primary h-11 rounded-lg"
          />
        </form>
      </div>
    </div>
  );
}
