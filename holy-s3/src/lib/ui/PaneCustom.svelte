<script lang="ts">
	import { Pane } from 'paneforge';
	export let className = 'w-full border  --min-h-[400px] gap-3';
</script>

<Pane minSize={10} class={className}>
	<slot />
</Pane>
