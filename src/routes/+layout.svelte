<script>
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	/** @typedef {Object} Data
	 *  @property {import('@supabase/supabase-js').SupabaseClient | null} supabase
	 *  @property {import('@supabase/supabase-js').Session | null} session
	 * */

	/** @type {Data} */
	export let data = {
		supabase: null,
		session: null
	};
	$: ({ supabase, session } = data);

	onMount(() => {
		return supabase
			? (() => {
					const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
						if (newSession?.expires_at !== session?.expires_at) {
							invalidate('supabase:auth');
						}
					});

					return () => data.subscription.unsubscribe();
				})()
			: undefined;
	});
</script>

<div class="grid min-h-screen place-items-center bg-background *:w-full">
	<slot />
</div>
