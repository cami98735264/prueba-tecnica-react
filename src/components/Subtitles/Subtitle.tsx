import { Icon } from "@iconify/react";
import { SubtitleProps } from "../../types";
import useColors from "../../hooks/useColors";



const Subtitle = ({ icon, children }: SubtitleProps) => {
    const { color } = useColors();
    const styles = {
        subtitle: {
            container: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
            },
            text: {
                fontSize: "var(--font-size-section-subtitle)",
                color: color.copy,
                fontWeight: 400,
            }
        }
    }

    return (
        <div style={styles.subtitle.container}>
            {icon && <Icon icon={icon} width="24" height="24" color={color.secondary} />}
            <h2 style={styles.subtitle.text}>{children}</h2>
        </div>
    )
}


export default Subtitle;