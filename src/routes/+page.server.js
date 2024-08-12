import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema, signUpSchema } from '$lib/settings/schema';

import { redirect } from '@sveltejs/kit';

/** @typedef {Object} Data
 * @prop {string | null} email
 * @prop {string} [username]
 * @prop {string} password
 * */

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (session) {
		redirect(303, '/play');
	}

	return {
		signInData: await superValidate(zod(loginSchema)),
		signUpData: await superValidate(zod(signUpSchema))
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	signin: async (e) => {
		const {
			request,
			locals: { supabase }
		} = e;

		const formData = await request.formData();

		/** @type {Data} */
		const data = {
			email: formData.get('email') !== null ? String(formData.get('email')) : null,
			password: formData.get('password') !== null ? String(formData.get('password')) : ''
		};

		if (data.email === null) {
			return fail(400, {
				success: false,
				message: 'Invalid email.'
			});
		}

		// SignIn
		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password
		});

		if (error) {
			return fail(400, {
				success: false,
				email: data.email,
				message: 'There was an issue during signin, please contact support.'
			});
		}

		return {
			success: true,
			message: 'Signed In, Welcome Back!'
		};
	},
	signup: async (e) => {
		const {
			request,
			locals: { supabase }
		} = e;

		const formData = await request.formData();

		/** @type {Data} */
		const data = {
			email: formData.get('email') !== null ? String(formData.get('email')) : null,
			username: formData.get('username') !== null ? String(formData.get('username')) : '',
			password: formData.get('password') !== null ? String(formData.get('password')) : ''
		};

		// SignUp
		if (data.email === null) {
			return fail(400, {
				success: false,
				message: 'Invalid email.'
			});
		}

		const { error } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options: {
				data: {
					email: data.email,
					username: data.username
				}
			}
		});

		if (error) {
			return fail(400, {
				success: false,
				email: data.email,
				message: 'There was an issue during signup, please contact support.'
			});
		}

		return {
			success: true,
			message: 'Signed Up, Welcome ' + data.username + '!'
		};
	}
};
