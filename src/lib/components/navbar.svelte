<script>
	/** @type {{ name: string; url: string; }[]} */
	const navMenu = [
		{
			name: 'Home',
			url: '/'
		},
		{
			name: 'Play',
			url: '/#'
		},
		{
			name: 'Room',
			url: '/#'
		}
	];
</script>

<nav>
	<ul class="flex gap-4">
		{#each navMenu as menu}
			<li>
				<a href={menu.url}>{menu.name}</a>
			</li>
		{/each}
	</ul>
</nav>
