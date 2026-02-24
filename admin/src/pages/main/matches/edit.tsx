import { DashboardLayout } from "@/layouts";
import {
  ButtonWithLoader,
  GoBack,
  InputWithoutIcon,
  SelectWithoutIcon,
} from "@/components/ui";
import { weeks } from "@/constants/data";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type EditMatchSchema, editMatchSchema } from "@/schemas/matches";
import { useParams } from "react-router-dom";
import { matches } from "@/constants/dummy";

export default function EditMatch() {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const toggleActive = () => setIsActive((prev) => !prev);
  const toggleCompleted = () => setIsCompleted((prev) => !prev);
  const match = matches.find((match) => match.id === Number(id));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditMatchSchema>({
    resolver: zodResolver(editMatchSchema),
  });
  const onSubmit = (data: EditMatchSchema) => {
    console.log(data, isActive, isCompleted);
  };

  useEffect(() => {
    if (match) {
      reset({
        week: match.week.toString(),
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeScore: match.homeScore.toString(),
        awayScore: match.awayScore.toString(),
      });
      setIsActive(match.isActive ? true : false);
      setIsCompleted(match.status.toLowerCase() === "completed" ? true : false);
    }
  }, [match]);

  return (
    <DashboardLayout>
      <GoBack title="Edit Match" />
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
        <InputWithoutIcon
          label="Home Score"
          placeholder="e.g 1"
          type="number"
          {...register("homeScore")}
          error={errors.homeScore?.message}
        />
        <InputWithoutIcon
          label="Away Score"
          placeholder="e.g 2"
          type="number"
          {...register("awayScore")}
          error={errors.awayScore?.message}
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
            onClick={toggleCompleted}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className={clsx(
                "p-1 cursor-pointer rounded-full w-10 transition-all duration-200",
                isCompleted ? "bg-green-500" : "bg-gray-200",
              )}
            >
              <div
                className={clsx(
                  "h-4 w-4 rounded-full transition-all duration-200 bg-white",
                  isCompleted ? "translate-x-full" : "translate-x-0",
                )}
              ></div>
            </div>
            <span className="text-nowrap">Completed</span>
          </div>
        </div>
        <ButtonWithLoader
          initialText="Edit Match"
          loadingText="Editing Match..."
          type="submit"
          className="btn-primary w-full h-11 rounded-lg"
        />
      </form>
    </DashboardLayout>
  );
}
