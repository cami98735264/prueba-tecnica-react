import useColors from "../../hooks/useColors";
import { Icon } from "@iconify/react";
import { AuditoryCardProps } from "../../types";

const AuditoryCard = ({ icon, description, buttonIcon, buttonLabel }: AuditoryCardProps) => {
  const { color } = useColors();

  const styles = {
    description: {
      fontSize: "var(--font-size-medium)",
      color: color.copy,
      fontWeight: 400,
    },
    button: {
      backgroundColor: color.primary,
      border: "none",
      borderRadius: "4px",
      padding: "8px",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    auditory: {
      border: `2px solid ${color.primary_light}`,
      borderRadius: "4px",
      display: "flex",
      gap: "12px",
      padding: "8px",
    },
    auditoryContent: {
      flex: 1,
      alignItems: "center",
      display: "flex",
      gap: "8px",
    },
  };
  return (
    <div className="auditory-card" style={styles.auditory}>
      <div className="auditory-card__content" style={styles.auditoryContent}>
        <Icon icon={icon} width="26" height="26" color={color.secondary} />
        <h3
          className="auditory-card__description"
          style={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <button className="auditory-card__button" style={styles.button}>
        <Icon icon={buttonIcon} width="26" height="26" color="#fff" />
        <span className="auditory-card__button-label" style={{ marginLeft: "8px" }}>{buttonLabel}</span>
      </button>
    </div>
  );
};

export default AuditoryCard;
