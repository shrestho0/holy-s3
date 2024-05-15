<script lang="ts">
	import { PaneGroup, Pane, PaneResizer } from 'paneforge';
	import PaneResizerHorizontal from '@/ui/PaneResizerHorizontal.svelte';
	import PaneResizerVertical from '@/ui/PaneResizerVertical.svelte';
	import PaneCustom from '@/ui/PaneCustom.svelte';

	import PreDebug from '@/dev/PreDebug.svelte';

	import LocalFileComponent from '@/components/LocalFilesComponent.svelte';
	import RemoteFileComponent from '@/components/RemoteFileComponent.svelte';

	import AddAComponent from '@/ui/AddAComponent.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Button } from '@/components/ui/button';

	let dummyText = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia vero quos labore doloremque
			voluptatem illum dicta sequi, quasi eos, fugiat harum illo. Deserunt quo necessitatibus cum
			eius quasi laudantium voluptate est earum nobis placeat minus error, aliquam, neque fugiat
			quod vero, incidunt excepturi officiis porro obcaecati quibusdam accusantium omnis cupiditate.
			At sit deserunt ex odio illum adipisci fugiat modi error suscipit quis accusamus labore eius,
			saepe laboriosam velit dignissimos?`;

	function addComponent() {
		console.log('addGroup');
		let item_id = layout[layout.length - 1].id;
		layout.push({
			id: `resizer${item_id}`,
			type: 'resizer',
			size: 10,
			className: '',
			title: 'Resizer',
			children: []
		});
		layout.push({
			id: `panel${item_id}`,
			type: 'panel',
			size: 50,
			className: '',
			title: 'Panel 3',
			children: []
		});
		layout = [...layout];
	}

	function splitComponent() {
		console.log('splitComponent');
	}

	let layout = [
		{
			id: 'panel1',
			type: 'panel',
			size: 50,
			className: 'bg-red-400',
			title: 'Panel 1',
			children: []
		},
		{
			id: 'resizer1',
			type: 'resizer',
			size: 10,
			className: 'bg-blue-400',
			title: 'Resizer',
			children: []
		},
		{
			id: 'panel2',
			type: 'panel',
			size: 50,
			className: 'bg-green-400',
			title: 'Panel 2',
			children: [
				{
					id: 'panel2-1',
					type: 'panel',
					size: 50,
					component: LocalFileComponent
				}
			]
		}
	];

	interface NewComponentOptions {
		modalOpen: boolean;
		parentId: string;
		selectedComponent: any;
		options: any[];
		_reset: () => void;
		openModal: (currentId: string) => void;
		closeModal: () => void;
	}

	const newComponentOptions: NewComponentOptions = {
		modalOpen: false,
		parentId: '',
		selectedComponent: null,
		options: [
			{
				id: 'local-files',
				name: 'Local Files',
				component: LocalFileComponent
			},
			{
				id: 'remote-files',
				name: 'Remote Files',
				component: RemoteFileComponent
			}
		],
		_reset: () => {
			newComponentOptions.modalOpen = false;
			newComponentOptions.selectedComponent = null;
			newComponentOptions.parentId = '';
		},
		openModal: (currentId: string) => {
			newComponentOptions.parentId = currentId;
			newComponentOptions.modalOpen = true;
		},
		closeModal: () => {
			newComponentOptions._reset();
		}
	};

	function selectComponent(parent_id: string, component: any) {
		layout.forEach((item) => {
			if (item.id === parent_id) {
				item.children.push({
					id: `${parent_id}-${item.children.length + 1}`,
					type: 'panel',
					size: 50,
					component: component
				});
			}
		});
	}
</script>

<div class="w-full h-[90%]">
	<div class="buttons border p-21">
		<button class="bg-blue-600 p-2 rounded text-blue-100 font-semibold" on:click={addComponent}
			>Add Component</button
		>
		<button class="bg-blue-600 p-2 rounded text-blue-100 font-semibold" on:click={splitComponent}
			>Split Component</button
		>
	</div>

	<PaneGroup direction="horizontal" class="w-full gap-3 h-[90%] ">
		{#each layout as item}
			<!-- <svelte:component this={item.component}></svelte:component> -->
			{#if item.type === 'panel'}
				<PaneCustom>
					{#if item.children.length > 0}
						{#each item.children as child}
							<svelte:component this={child.component}></svelte:component>
						{/each}
					{:else}
						<AddAComponent on:click={() => newComponentOptions.openModal(item.id)} />
					{/if}
				</PaneCustom>
			{:else if item.type === 'resizer'}
				<PaneResizerHorizontal />
			{/if}
		{/each}
	</PaneGroup>
</div>
<Drawer.Root
	bind:open={newComponentOptions.modalOpen}
	closeOnOutsideClick={false}
	onClose={newComponentOptions.closeModal}
>
	<Drawer.Content class="min-h-[400px]">
		<Drawer.Header>
			<Drawer.Title>Select Component</Drawer.Title>
			<Drawer.Description class="flex items-center gap-3 py-4">
				<!-- buttons -->
				{#each newComponentOptions.options as option}
					<!-- rounded boxes -->
					<button
						class=" flex items-center justify-center text-black/80 p-2 rounded font-semibold border"
						on:click={() => {
							selectComponent(newComponentOptions.parentId, option.component);
							newComponentOptions.closeModal();
						}}
					>
						<div class="icon">
							<div class="text-4xl">+</div>
						</div>
						<div class="flex items-center justify-center">
							<div class="text-lg font-semibold">{option.name}</div>
						</div>
					</button>
				{/each}
			</Drawer.Description>
		</Drawer.Header>
		<Drawer.Footer>
			<Drawer.Close>Cancel</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
