export const prerender = true;
export const ssr = false;

import type { UserData } from '@/utils/types';
import type { Load } from '@sveltejs/kit';
import { Store } from '@tauri-apps/plugin-store';


export const load: Load = async () => {

    // check if setup done
    const store = new Store("setup-store.bin")

    const setupComplete = await store.get<boolean>("setupComplete") ?? false
    const userData = await store.get<UserData | null>("userData")

    console.log("setupComplete", setupComplete, typeof setupComplete)
    console.log("userData", userData, typeof userData)


    return {
        setupComplete,
        userData,
    }
};