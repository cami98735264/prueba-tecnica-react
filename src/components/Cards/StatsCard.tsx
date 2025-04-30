import { Icon } from "@iconify/react";
import type { StatsCardProps, StatsCardStyles } from "../../types"
import useColors from "../../hooks/useColors";

const StatsCard = ({ icon, highlight, description, gridStyles, iconSize, flexDirection, textSize }: StatsCardProps) => {
    const { color } = useColors();
    let textSizeStyle: { highlight: { fontSize: string }, description: { fontSize: string } } = {
        highlight: {
            fontSize: "var(--font-size-stats-large-highlight)",
        },
        description: {
            fontSize: "var(--font-size-stats-large-description)",
        }
    };
    switch (textSize) {
        case "large":
            textSizeStyle = {
                highlight: {
                    fontSize: "var(--font-size-stats-large-highlight)",
                },
                description: {
                    fontSize: "var(--font-size-stats-large-description)",
                }
            };
            break;
        case "small":
            textSizeStyle = {
                highlight: {
                    fontSize: "var(--font-size-stats-small-highlight)",
                },
                description: {
                    fontSize: "var(--font-size-stats-small-description)",
                }
            };
            break;
            default:
            textSizeStyle = {
                highlight: {
                    fontSize: "var(--font-size-stats-highlight)",
                },
                description: {
                    fontSize: "var(--font-size-stats-description)",
                }
            };
            break;
    }

    const styles: StatsCardStyles = {
        card: {
            padding: "4px",
            display: "flex",
            flexDirection: flexDirection || "column",
            justifyContent: "center",
            alignItems: "center",
            border: `2px solid ${color.primary_light}`,
            borderRadius: "4px",
            backgroundColor: color.foreground,
            gap: "4px",
        },
        icon: {
            color: color.primary_light,
        },
        description: {
            fontSize: textSizeStyle.description.fontSize,
            color: color.copy_light,
            textAlign: "center",
        },
        highlight: {
            fontSize: textSizeStyle.highlight.fontSize,
            color: color.primary,
            fontWeight: "600",
            textAlign: "center",
        },
        content: {
            display: "flex",
            flexDirection: flexDirection || "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
        }
        
    }
    return (
        <div className="stats-card" style={{... styles.card, ... gridStyles }}>
            <div className="stats-card__icon">
                <Icon icon={icon} width={iconSize || 100} height={iconSize || 100} style={styles.icon}/>
            </div>
            <div className="stats-card__content" style={styles.content}>
                <h2 className="stats-card__highlight" style={styles.highlight}>{highlight}</h2>
                <p className="stats-card__description" style={styles.description}>{description}</p>
            </div>
        </div>
    )
}

export default StatsCard