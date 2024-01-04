import { z } from 'zod';

const LoginResponseSchema = z.object({
    session: z.object({
        access_token: z.string()
    }).nullable(),
    error: z
        .string()
        .or(
            z.object({ message: z.string() })
        )
        .optional()
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export default LoginResponseSchema;