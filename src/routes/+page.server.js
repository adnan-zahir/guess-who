import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from "$lib/settings/schema";

import { redirect } from "@sveltejs/kit";

/** @typedef {Object} Data
  * @prop {string} email
  * @prop {string} password
  * */

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();

  console.log(session);

  if (session) {
    redirect(303, '/play');
  }

  return {
    form: await superValidate(zod(loginSchema)),
  };
};

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (e) => {
    const {
      request, locals: { supabase }
    } = e;

    const formData = await request.formData();

    /** @type {Data} */
    const data = {
      email: String(formData.get('email')),
      password: String(formData.get('password'))
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email, password: data.password,
    })

    if (error) {
      return fail(400, {
        success: false,
        email: data.email,
        message: "There was an issue, please contact support."
      })
    }

    return {
      success: true,
      message: "Signed In, Welcome Back!"
    }
  }
}
