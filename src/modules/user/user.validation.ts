import {z} from "zod";

export const createUserZodSchema = z.object({
    name: z.string({error: "Name is required"}).min(3, {message: "Name must be at least 3 character long"}),
    email: z.email({message: "Invalid email address"}),
    password: z.string({error: "Password is required"})
        .min(8, {message: "Password must be at least 8 characters long"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        }),
});

export type CreateUserInput = z.infer<typeof createUserZodSchema>;
