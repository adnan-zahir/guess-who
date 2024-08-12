<script>
	import Lgcontainer from '$lib/components/lgcontainer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
</script>

<div class="flex flex-col min-h-screen items-center *:w-full">
	<header class="min-h-12 px-4 grid place-items-center">
		<Lgcontainer className="gap-2 bg-red-600" center="both">
			<p class="text-lg font-bold">Guess Who</p>
			<div class="flex-1 flex justify-center">
				<Navbar />
			</div>
			<p>Login</p>
		</Lgcontainer>
	</header>
	<main class="flex-1 flex justify-center *:w-full">
		<Lgcontainer className="flex-col">
			<slot></slot>
		</Lgcontainer>
	</main>
	<footer class="min-h-12 px-4 grid place-items-center">
		<Lgcontainer center="both" className="bg-red-600">Footer</Lgcontainer>
	</footer>
</div>
