
import { redirect, type Load } from '@sveltejs/kit';

export const load: Load = async ({ params, parent }) => {
    const d = await parent() as {
        setupComplete: boolean
    }


    if (!d.setupComplete) {
        return redirect(307, "/setup")
    }

}; 