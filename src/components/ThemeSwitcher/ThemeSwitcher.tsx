import { Icon } from "@iconify/react";
import usePreferencesStore from "../../stores/preferences";
import useColors from "../../hooks/useColors";

const ThemeSwitcher = () => {
    const { theme, setTheme } = usePreferencesStore();
    const { color } = useColors();

    const handleThemeSwitch = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button className="theme-switcher"
            onClick={handleThemeSwitch}
            style={{
                background: color.secondary,
                border: 'none',
                cursor: 'pointer',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color.secondary_content,
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                marginLeft: '20px',
                gap: '8px',
                fontSize: 'var(--font-size-nav-link)',
                width: '180px',
                whiteSpace: 'nowrap',
            }}
            aria-label={`Cambiar el tema a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
        >
            <Icon 
                icon={theme === 'light' ? 'ph:moon-fill' : 'ph:sun-fill'} 
                width="20" 
                className="theme-switcher__icon"
                height="20"
            />
            {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        </button>
    );
};

export default ThemeSwitcher; 