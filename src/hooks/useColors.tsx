
import colors from "../utils/colors"
import usePreferencesStore from "../stores/preferences"

const useColors = () => {
    const { theme } = usePreferencesStore()
    const color = colors[theme as keyof typeof colors]
    return {
        color,
        theme
    }

}

export default useColors