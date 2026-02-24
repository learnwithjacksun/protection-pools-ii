import z from "zod";


export const editUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone is required"),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;


export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone is required"),
    password: z.string().min(1, "Password is required"),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;