
export async function setTheme(theme: string | undefined | null) {
    // console.log("setting theme")
    if (!theme) theme = "system"

    let carbonTheme: 'g100' | 'white';


    if (theme == "system") {
        // const theme = await getCurrentWindow().theme()
        // console.log('system theme', theme)
        carbonTheme = 'g100'
        // carbonTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'g100' : 'white'
    } else if (theme == "light") {
        carbonTheme = "white"
    } else if (theme == "dark") {
        carbonTheme = "g100"
    } else {
        throw new Error("Invalid theme")
    }

    document.documentElement.setAttribute("theme", carbonTheme);
    // console.log("theme set")
}

