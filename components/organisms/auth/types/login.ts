import { z } from "zod";

export const LoginFormSchema = z.object({
  identifier: z.string().min(1, "Username/Email is required"),
  password: z.string().min(1, "Password is required"),
});
export type LoginFormSchema = z.infer<typeof LoginFormSchema>;
