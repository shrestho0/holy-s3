<script lang="ts">
	export let data: {};
	export let title: string = '';
	// data = structuredClone(data);
</script>

<!-- PreDebugging -->
<!-- Takes A Data Object and shows inside pre tag with title as string -->

<pre class="border m-8 p-4 bg-gray-50 rounded">
<h2 class="debug_title">#Debugging{title ? ': ' + title : ''}</h2>
{JSON.stringify(data, null, 2)}
</pre>
