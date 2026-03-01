import { DashboardLayout } from "@/layouts";
import {
  ButtonWithLoader,
  GoBack,
  InputWithoutIcon,
} from "@/components/ui";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type EditMatchSchema, editMatchSchema } from "@/schemas/matches";
import { useParams } from "react-router-dom";
import { useAdmin, useMatches } from "@/hooks";
import { Calendar } from "iconsax-reactjs";

export default function EditMatch() {
  const { id } = useParams();
  const { admin } = useAdmin();
  const { updateMatch, isUpdating, matches } = useMatches();
  const [isAvailable, setIsAvailable] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const toggleActive = () => {
    setIsAvailable((prev) => !prev);
  };
  const toggleCompleted = () => {
    setIsCompleted((prev) => !prev);
  };
  const match = matches?.find((match) => match.id === id);
  console.log(match);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditMatchSchema>({
    resolver: zodResolver(editMatchSchema),
  });
  const onSubmit = (data: EditMatchSchema) => {
    const status = isCompleted ? "completed" : "pending";
    updateMatch(id!, data, isAvailable, status, admin?.currentWeek ?? 0);
  };

  useEffect(() => {
    if (match) {
      reset({
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeScore: match.homeScore.toString(),
        awayScore: match.awayScore.toString(),
      });
      setIsAvailable(match.isAvailable ? true : false);
      setIsCompleted(match.status.toLowerCase() === "completed" ? true : false);
    }
  }, [match, reset]);

  return (
    <DashboardLayout>
      <GoBack title="Edit Match" />
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
                isAvailable ? "bg-primary" : "bg-gray-200",
              )}
            >
              <div
                className={clsx(
                  "h-4 w-4 rounded-full transition-all duration-200 bg-white",
                  isAvailable ? "translate-x-full" : "translate-x-0",
                )}
              ></div>
            </div>
            <span className="text-nowrap">Availability</span>
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
          loading={isUpdating}
          className="btn-primary w-full h-11 rounded-lg"
        />
      </form>
    </DashboardLayout>
  );
}
