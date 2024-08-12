<script>
	/** @type {string | null} - additional class */
	export let className = null;
	/** @type {'x' | 'y' | 'both' | null} - center flex children */
	export let center = null;

	const centerClass =
		center === 'x'
			? 'justify-center'
			: center === 'y'
				? 'items-center'
				: center === 'both'
					? 'justify-center items-center'
					: '';
</script>

<div class="max-w-6xl w-full flex {className && className} {centerClass}">
	<slot></slot>
</div>

