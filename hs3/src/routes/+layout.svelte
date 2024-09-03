<script lang="ts">
    import "carbon-components-svelte/css/all.css";
    import "@/ui/app.css";
    import { page } from "$app/stores";
    import type { LayoutData } from "./$types";
    import { Store } from "@tauri-apps/plugin-store";
    import { onMount } from "svelte";
    import { Loading } from "carbon-components-svelte";
    import { setTheme } from "@/utils/theme";
    import { getCurrentWindow } from "@tauri-apps/api/window";
    import type { UserData } from "@/utils/types";

    export let data: {
        setupComplete: boolean;
        userData: UserData | null;
        userTheme: "g100" | "white" | "system";
    };

    let loading = true;

    window.addEventListener("storage", function (event) {
        if (event.key === "theme") {
            // console.log("changed storage");
            setTheme(event.newValue);
        }
    });
    onMount(() => {
        setTheme(localStorage.getItem("theme"));
        loading = false;
    });
</script>

<main class="w-full h-screen">
    {#if loading}
        <div class="w-full bg-red-400 h-screen">Loading...</div>
        <!-- <Loading /> -->
    {:else}
        <slot />
    {/if}
</main>
