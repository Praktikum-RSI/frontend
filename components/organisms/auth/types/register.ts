import { z } from "zod";

export const RegisterFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  username: z.string().min(6, "Username must be at least 6 characters"),
  email: z.email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    ),
  whatsapp_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid whatsapp number"),
});
export type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;
