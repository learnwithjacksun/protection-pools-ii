import {
  ButtonWithLoader,
  GoBack,
  InputWithoutIcon,
  SelectWithoutIcon,
} from "@/components/ui";
import { weeks } from "@/constants/data";
import { DashboardLayout } from "@/layouts";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateMatchSchema, createMatchSchema } from "@/schemas/matches";

export default function AddMatch() {
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
    console.log(data, isActive);
  };
  return (
    <DashboardLayout>
      <GoBack title="Add Match" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="wrapper space-y-6 bg-white border border-line p-4 md:p-6 rounded-lg"
      >
        <SelectWithoutIcon
          label="Week"
          options={weeks}
          {...register("week")}
          error={errors.week?.message}
        />
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
          className="btn-primary w-full h-11 rounded-lg"
        />
      </form>
    </DashboardLayout>
  );
}
