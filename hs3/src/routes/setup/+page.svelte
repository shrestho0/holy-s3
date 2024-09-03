<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { setTheme } from "@/utils/theme";
    import type { UserData } from "@/utils/types";
    import { invoke } from "@tauri-apps/api/core";
    import { Store } from "@tauri-apps/plugin-store";
    import {
        Checkbox,
        TextInput,
        Button,
        RadioButtonGroup,
        RadioButton,
    } from "carbon-components-svelte";
    import { onMount } from "svelte";

    export let data: {
        userData: UserData;
        setupComplete: boolean;
    };

    console.log("setup page", data);

    const newUserData: UserData = {
        name: "",
        hasMasterPassword: true,
        masterPassword: "",
    };
    const oldUserData = {
        selectedPasswordOption: "nochange",
        hasPreviouslySetMasterPassword:
            data?.userData?.hasMasterPassword ?? false,

        newName: data?.userData?.name ?? "",

        newMasterPassword: "",
    } as {
        selectedPasswordOption: "set" | "nochange" | "update" | "remove";
        hasPreviouslySetMasterPassword: boolean;

        newName: string;
        newHasMasterPassword: boolean;
        newMasterPassword: string;
    };

    let selectedTheme: "light" | "dark";

    const store = new Store("setup-store.bin");

    onMount(() => {
        const preTheme = localStorage.getItem("theme") as "light" | "dark";

        if (!preTheme) {
            localStorage.setItem("theme", "dark");
        }

        selectedTheme = preTheme;
    });

    let err_msg = "";
    async function confirmSetup() {
        err_msg = "";

        // for new setup
        if (!newUserData.name) {
            err_msg = "Please enter your name";
            return;
        }
        if (newUserData.hasMasterPassword && !newUserData.masterPassword) {
            err_msg = "Please enter a master password";
            return;
        }

        if (newUserData.masterPassword) {
            newUserData.masterPassword = await invoke("hash_password", {
                password: newUserData.masterPassword,
            });
        }

        await store.set("userData", newUserData);

        await store.set("setupComplete", true);

        localStorage.setItem("theme", selectedTheme);
        window.location.href = "/";
    }

    async function updatePreferences() {
        // for updating preferences
        err_msg = "";

        let name = oldUserData.newName;
        let hasMasterPassword: boolean;
        let masterPassword: string;

        if (oldUserData.selectedPasswordOption == "remove") {
            hasMasterPassword = false;
            masterPassword = "";
        } else if (
            oldUserData.selectedPasswordOption == "set" ||
            oldUserData.selectedPasswordOption == "update"
        ) {
            hasMasterPassword = true;
            // masterPassword = oldUserData.newMasterPassword;
            masterPassword = await invoke("hash_password", {
                password: oldUserData.newMasterPassword,
            });
        } else {
            hasMasterPassword = data?.userData?.hasMasterPassword;
            masterPassword = data?.userData?.masterPassword;
        }

        if (hasMasterPassword && !masterPassword) {
            err_msg = "Please enter a master password";
            return;
        }

        if (!name) {
            err_msg = "Please enter your name";
            return;
        }

        const xxxx = {
            name: oldUserData.newName,
            hasMasterPassword,
            masterPassword,
        } as UserData;

        await store.set("userData", xxxx);
        invalidateAll();
        window.location.href = "/";
        // window.location.reload();
    }
</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
<div class="py-3"></div>
<div
    class="w-full h-screen flex flex-col gap-4 items-center justify-center pb-12"
>
    <div class="welcome flex flex-col items-center gap-2">
        <span class="text-2xl">
            {data?.setupComplete
                ? "holyS3 Preferences"
                : "Welcome to holyS3 File Manager"}
        </span>
        <span class="text-xl"
            >{data?.setupComplete
                ? "Modify your customizations"
                : "Complete setup to continue "}</span
        >
    </div>

    <div class="flex flex-col gap-2 user-data max-w-xl w-full">
        {#if !data.setupComplete}
            <TextInput
                bind:value={newUserData.name}
                class="py-6"
                placeholder="your name"
            />

            <Checkbox
                bind:checked={newUserData.hasMasterPassword}
                labelText="Setup a master password"
            />

            {#if newUserData.hasMasterPassword}
                <TextInput
                    bind:value={newUserData.masterPassword}
                    class="py-6"
                    placeholder="Enter master password"
                />
            {/if}
        {:else}
            <TextInput
                bind:value={oldUserData.newName}
                class="py-6"
                placeholder="your name"
            />

            <!-- // update -->
            <div class="flex flex-col gap-2">
                <span class="text-lg">Modify Password Settings</span>

                <RadioButtonGroup
                    orientation="horizontal"
                    name="x"
                    bind:selected={oldUserData.selectedPasswordOption}
                >
                    <RadioButton labelText="No Change" value="nochange" />
                    {#if !oldUserData.hasPreviouslySetMasterPassword}
                        <RadioButton labelText="Set New Password" value="set" />
                    {:else}
                        <RadioButton
                            labelText="Update Master Password"
                            value="update"
                        />
                        <RadioButton
                            labelText="Remove Master Password"
                            value="remove"
                        />
                    {/if}
                </RadioButtonGroup>

                {#if oldUserData.selectedPasswordOption == "update" || oldUserData.selectedPasswordOption == "set"}
                    <TextInput
                        bind:value={oldUserData.newMasterPassword}
                        class="py-6"
                        placeholder="Enter new master password"
                    />
                {/if}
            </div>
        {/if}

        <!-- theme selector for system, white, dark -->
        <div class="flex flex-col gap-2">
            <span class="text-lg">Select a theme</span>

            <RadioButtonGroup
                orientation="horizontal"
                name="plan-vertical"
                bind:selected={selectedTheme}
                on:change={() => {
                    setTheme(selectedTheme);
                }}
            >
                <RadioButton labelText="Dark" value="dark" />
                <RadioButton labelText="Light" value="light" />
            </RadioButtonGroup>
        </div>

        {#if err_msg}
            <span class="text-red-500 text-sm">{err_msg}</span>
        {/if}
        {#if data.setupComplete}
            <Button on:click={updatePreferences} style="max-width:100%;"
                >Update Preferences</Button
            >
        {:else}
            <Button on:click={confirmSetup} style="max-width:100%;"
                >Confirm Setup</Button
            >
        {/if}
    </div>
</div>

<pre>{JSON.stringify(oldUserData, null, 2)}</pre>
