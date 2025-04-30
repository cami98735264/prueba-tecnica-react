import usePreferencesStore from "../stores/preferences";
import { useEffect } from "react";
import useColors from "../hooks/useColors";


const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const { theme } = usePreferencesStore();
    const { color } = useColors();
    
    useEffect(() => {
        document.documentElement.style.setProperty('--background', color.background);
        document.documentElement.style.setProperty('--foreground', color.foreground);
        document.documentElement.style.setProperty('--copy', color.copy);
        document.documentElement.style.setProperty('--primary', color.primary);
        document.documentElement.style.setProperty('--primary-content', color.primary_content);
        document.documentElement.style.setProperty('--primary-dark', color.primary_dark);
        document.documentElement.style.setProperty('--primary-light', color.primary_light);
        document.documentElement.style.setProperty('--secondary', color.secondary);
        document.documentElement.style.setProperty('--secondary-content', color.secondary_content);
        document.documentElement.style.setProperty('--secondary-dark', color.secondary_content);
        document.documentElement.style.setProperty('--secondary-light', color.secondary_light);
        document.documentElement.style.setProperty('--border', color.border);
        document.documentElement.style.setProperty('--copy-light', color.copy_light);
        document.documentElement.style.setProperty('--copy-lighter', color.copy_lighter);

    }, [theme]);
    
    return (
        <>
        {children}
        </>
    );
}


export default ThemeProvider;