<script>
	/** @type {[ boolean, boolean ]} - Left Sidebar, Right Sidebar */
	let isOpen = [true, false];

	/** @function
	 * @param {"left" | "right"} side
	 */
	function toggleOpen(side) {
		side === 'left' ? (isOpen[0] = !isOpen[0]) : (isOpen[1] = !isOpen[1]);
	}
</script>

<div id="main" class="flex w-full">
	<div id="left" class="bg-red-300 p-4">
		<button on:click={() => toggleOpen('left')}>{isOpen[0] ? '>' : '<'}</button>
		<div class={`${isOpen[0] ? 'max-w-0' : 'max-w-md'} overflow-hidden transition-all`}>
			<p class="text-nowrap">Left Sidebar</p>
			<ul class="*:text-nowrap">
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
			</ul>
		</div>
	</div>
	<div id="middle" class="bg-green-300 flex-1 grid place-items-center">Middle</div>
	<div id="right" class="bg-blue-300 p-4">
		<button on:click={() => toggleOpen('right')}>{isOpen[1] ? '<' : '>'}</button>
		<div class={`${isOpen[1] ? 'max-w-0' : 'max-w-md'} overflow-hidden transition-all`}>
			<p>Right Sidebar</p>
			<ul>
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
			</ul>
		</div>
	</div>
</div>
