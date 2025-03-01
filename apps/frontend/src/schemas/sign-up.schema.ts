import {z} from 'zod';

export const signupSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email' }),
  name: z.string().trim().min(3, { message: 'Name must be at least 3 characters' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least one special character' }),
     confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export type SignupFormInputs = z.infer<typeof signupSchema>
