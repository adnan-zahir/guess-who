<script>
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema, signUpSchema } from '$lib/settings/schema.js';

	/** @typedef {import('$lib/settings/schema.js').LoginSchema} LoginSchema */
	/** @typedef {import('sveltekit-superforms').Infer<LoginSchema>} SignInInfer */
	/** @typedef {import('sveltekit-superforms').SuperValidated<SignInInfer>} SignInSuperValidated */

	/** @typedef {import('$lib/settings/schema.js').SignUpSchema} SignUpSchema */
	/** @typedef {import('sveltekit-superforms').Infer<SignUpSchema>} SignUpInfer */
	/** @typedef {import('sveltekit-superforms').SuperValidated<SignUpInfer>} SignUpSuperValidated */

	/** @typedef {Object} Data
	 * @prop {SignInSuperValidated} signInData - with Email and Password
	 * @prop {SignUpSuperValidated} signUpData - with Email, Username and Password
	 */

	/** @type {Data} */
	export let data;
	const { signInData, signUpData } = data;

	/** @type {import('./$types').ActionData} */
	export let form;

	// TODO: use the returned data to show a notification if error or success
	console.log(form);

	const signInForm = superForm(signInData, {
		validators: zodClient(loginSchema)
	});
	const { form: signInFormData, enhance: signInEnhance } = signInForm;

	const signUpForm = superForm(signUpData, {
		validators: zodClient(signUpSchema)
	});
	const { form: signUpFormData, enhance: signUpEnhance } = signUpForm;

	/** @type {boolean} - true = signin, false = signup*/
	let showForm = true;

	const switchForm = () => {
		showForm = !showForm;
	};
</script>

<svelte:head>
	<title>GUESS WHO | {showForm ? 'Login' : 'Register'}</title>
</svelte:head>

<Card.Root class="max-w-lg border border-foreground shadow-md">
	<Card.Header class="text-center">
		<Card.Title>Welcome and Let's Play!</Card.Title>
		<Card.Description>
			{showForm ? 'Sign in to your registered account to play.' : 'Sign up with email to play.'}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if showForm}
			<form method="POST" action="?/signin" use:signInEnhance>
				<Form.Field form={signInForm} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} type="email" bind:value={$signInFormData.email} />
					</Form.Control>
					<Form.Description>Please input a registered email.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={signInForm} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input {...attrs} type="password" bind:value={$signInFormData.password} />
					</Form.Control>
					<Form.Description>Your Password</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Sign In</Form.Button>
			</form>
		{:else}
			<form method="POST" action="?/signup" use:signUpEnhance>
				<Form.Field form={signUpForm} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} type="email" bind:value={$signUpFormData.email} />
					</Form.Control>
					<Form.Description>Please input a valid email.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={signUpForm} name="username">
					<Form.Control let:attrs>
						<Form.Label>Username</Form.Label>
						<Input {...attrs} bind:value={$signUpFormData.username} />
					</Form.Control>
					<Form.Description>It will be your shown name.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={signUpForm} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input {...attrs} type="password" bind:value={$signUpFormData.password} />
					</Form.Control>
					<Form.Description>New Password</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Sign Up</Form.Button>
			</form>
		{/if}
	</Card.Content>
	<Card.Footer class="flex justify-center">
		<button class="text-blue-600" on:click={switchForm}
			>{showForm ? 'Create an account' : 'Login'}</button
		>
		&nbsp; instead?
	</Card.Footer>
</Card.Root>
