import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

export const signUpSchema = z.object({
	email: z.string().email(),
	username: z.string().min(5),
	password: z.string().min(8)
});

/** @typedef {typeof loginSchema} LoginSchema */
/** @typedef {typeof signUpSchema} SignUpSchema */
