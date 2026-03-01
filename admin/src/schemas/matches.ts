import z from "zod";


export const editMatchSchema = z.object({
   
    homeTeam: z.string().min(1, "Home team is required"),
    awayTeam: z.string().min(1, "Away team is required"),
    homeScore: z.string().min(1, "Home score is required"),
    awayScore: z.string().min(1, "Away score is required"),
});

export type EditMatchSchema = z.infer<typeof editMatchSchema>;


export const createMatchSchema = z.object({
   
    homeTeam: z.string().min(1, "Home team is required"),
    awayTeam: z.string().min(1, "Away team is required"),
});

export type CreateMatchSchema = z.infer<typeof createMatchSchema>;
