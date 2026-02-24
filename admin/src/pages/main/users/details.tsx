import { ButtonWithLoader, GoBack, InputWithoutIcon } from "@/components/ui";
import { users } from "@/constants/dummy";
import { DashboardLayout } from "@/layouts";
import { editUserSchema, type EditUserSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Ticket } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const user = users.find((user) => user.id === Number(id));
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const toggleActive = () => setIsActive((prev) => !prev);
  const toggleAdmin = () => setIsAdmin((prev) => !prev);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
  });
  const onSubmit = (data: EditUserSchema) => {
    console.log(data, isActive, isAdmin);
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
      setIsActive(user.isActive);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
  return (
    <DashboardLayout>
      <GoBack title="User Details" />

      <div className="wrapper bg-white p-4 rounded flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm">Total Bets</p>
          <h3 className="text-3xl font-semibold">4</h3>
        </div>
        <div className=" gap-4 bg-violet-500/10 h-14 w-14 center rounded">
          <Ticket size={24} className="text-violet-500" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="wrapper space-y-6 bg-white border border-line p-4 md:p-6 rounded-lg"
      >
        <InputWithoutIcon
          label="Name"
          placeholder="e.g John Doe"
          type="text"
          {...register("name")}
          error={errors.name?.message}
        />
        <InputWithoutIcon
          label="Email"
          placeholder="e.g [EMAIL_ADDRESS]"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputWithoutIcon
          label="Phone"
          placeholder="e.g 1"
          type="number"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <div className="flex md:items-center justify-between flex-wrap gap-4">
          <div
            onClick={toggleActive}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className={clsx(
                "p-1 cursor-pointer rounded-full w-10 transition-all duration-200",
                isActive ? "bg-primary" : "bg-gray-200",
              )}
            >
              <div
                className={clsx(
                  "h-4 w-4 rounded-full transition-all duration-200 bg-white",
                  isActive ? "translate-x-full" : "translate-x-0",
                )}
              ></div>
            </div>
            <span className="text-nowrap">Keep Active</span>
          </div>
          <div
            onClick={toggleAdmin}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className={clsx(
                "p-1 cursor-pointer rounded-full w-10 transition-all duration-200",
                isAdmin ? "bg-amber-500" : "bg-gray-200",
              )}
            >
              <div
                className={clsx(
                  "h-4 w-4 rounded-full transition-all duration-200 bg-white",
                  isAdmin ? "translate-x-full" : "translate-x-0",
                )}
              ></div>
            </div>
            <span className="text-nowrap">Make Admin</span>
          </div>
        </div>
        <ButtonWithLoader
          initialText="Update User"
          loadingText="Updating User..."
          type="submit"
          className="btn-primary w-full h-11 rounded-lg"
        />
      </form>
    </DashboardLayout>
  );
}
