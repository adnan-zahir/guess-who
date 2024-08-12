<script>
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/settings/schema.js';

	/** @typedef {import('$lib/settings/schema.js').LoginSchema} LoginSchema */
	/** @typedef {import('sveltekit-superforms').Infer<LoginSchema>} Infer */
	/** @typedef {import('sveltekit-superforms').SuperValidated<Infer>} SuperValidated */

	/** @type {SuperValidated} */
	export let data;

	const form = superForm(data, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<h1 class="header">Supabase + SvelteKit</h1>
	<p class="description">Sign in with email</p>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description>Please input a registered email.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$formData.password} />
		</Form.Control>
		<Form.Description>Your Password</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Sign In</Form.Button>
</form>
