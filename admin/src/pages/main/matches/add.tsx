import {
  ButtonWithLoader,
  GoBack,
  InputWithoutIcon,
} from "@/components/ui";
import { DashboardLayout } from "@/layouts";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateMatchSchema, createMatchSchema } from "@/schemas/matches";
import { useAdmin, useMatches } from "@/hooks";
import { Calendar } from "iconsax-reactjs";

export default function AddMatch() {
  const { admin } = useAdmin();
  const { createMatch, isCreating } = useMatches();
  const [isActive, setIsActive] = useState(true);
  const toggleActive = () => setIsActive((prev) => !prev);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMatchSchema>({
    resolver: zodResolver(createMatchSchema),
  });
  const onSubmit = (data: CreateMatchSchema) => {
    createMatch(data, isActive, admin?.currentWeek ?? 0);
  };
  return (
    <DashboardLayout>
      <GoBack title="Add Match" />

      <div className="wrapper bg-white p-4 rounded flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm">Current Week</p>
          <h3 className="text-3xl font-semibold">{admin?.currentWeek}</h3>
        </div>
        <div className=" gap-4 bg-primary/10 h-14 w-14 center rounded">
          <Calendar size={24} className="text-primary" />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="wrapper space-y-6 bg-white border border-line p-4 md:p-6 rounded-lg"
      >
       
        <InputWithoutIcon
          label="Home Team"
          placeholder="e.g Arsenal FC"
          type="text"
          {...register("homeTeam")}
          error={errors.homeTeam?.message}
        />
        <InputWithoutIcon
          label="Away Team"
          placeholder="e.g Liverpool FC"
          type="text"
          {...register("awayTeam")}
          error={errors.awayTeam?.message}
        />

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

          <span>Keep Active</span>
        </div>
        <ButtonWithLoader
          initialText="Add Match"
          loadingText="Adding Match..."
          type="submit"
          loading={isCreating}
          className="btn-primary w-full h-11 rounded-lg"
        />
      </form>
    </DashboardLayout>
  );
}
