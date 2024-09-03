<script lang="ts">
    import AddS3BucketIcon from "@/ui/icons/AddS3BucketIcon.svelte";
    import ListS3BucketIcon from "@/ui/icons/ListS3BucketIcon.svelte";
    import Palette from "@/ui/icons/Palette.svelte";
    import QuickAccess from "@/ui/icons/QuickAccess.svelte";
    import SavedSessionsIcon from "@/ui/icons/SavedSessionsIcon.svelte";
    import StartHolySessionIcon from "@/ui/icons/StartHolySessionIcon.svelte";
    import type { UserData } from "@/utils/types";
    import { Button } from "carbon-components-svelte";

    export let data: {
        setupComplete: boolean;
        userData: UserData | null;
    };
</script>

<!-- <div class="test-links">
    <Button kind="tertiary" size="small" href="/">Home</Button>
    <Button kind="tertiary" size="small" href="/setup">Customize</Button>
</div> -->
<section
    class="flex flex-col h-full items-center gap-8 py-16 justify-around w-full"
>
    <div class="welcome text-2xl w-full text-center">
        Welcome, {data?.userData?.name ?? "Anonymous User"}
    </div>
    <div class="flex flex-col gap-4">
        <div class="options flex gap-4">
            <a href="/s3-list" class="option-btn">
                <ListS3BucketIcon />
                S3 Buckets
            </a>
            <div class="option-btn">
                <SavedSessionsIcon />
                Saved Sessions
            </div>
            <a class="option-btn" href="/setup">
                <Palette />
                Customize
            </a>
        </div>
        <button
            class="flex gap-2 text-[16px] bg-[var(--cds-interactive-01)] hover:bg-[var(--cds-hover-primary)] rounded-xl items-center justify-center py-3"
        >
            Start a holy session
            <StartHolySessionIcon />
        </button>
        <!-- <Button class="rounded-xl">Start a session</Button> -->
    </div>

    <div class="quick-access">
        <div class="text-xl flex gap-2">
            <QuickAccess /> Quick Access
        </div>
    </div>
</section>

<style>
    /* flex flex-col gap-3 rounded-xl items-center justify-center w-32 h-32 text-xl bg-blue-600 */
    .option-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 10rem;
        height: 6rem;
        font-size: 16px;
        background-color: var(--cds-interactive-01);
        /* opacity: 0.8; */
        gap: 0.5rem;
        border-radius: 1rem;
        color: #f4f4f4;
    }
    .option-btn:hover {
        background-color: var(--cds-hover-primary);
        cursor: pointer;
    }
</style>
