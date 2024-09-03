

// this just runs on all page
// not necessary for now

import { setTheme } from "@/utils/theme";

window.addEventListener("storage", function (event) {
    if (event.key === "theme") {
        console.log("changed storage");
        setTheme(event.newValue);
    }
});
