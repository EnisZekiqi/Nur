import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Theme = "light" | "dark";

type ThemeState = {
    theme:Theme,
    changeTheme:()=>void
}

export const useTheme = create<ThemeState>()(
    persist(
        (set)=>({
            theme:'light',
            changeTheme:()=>set((state)=>({
                theme:state.theme === 'light'?'dark':'light'
            }))
        }),
       { name:'themeColor',
        storage:createJSONStorage(()=>localStorage)}
    )
)
