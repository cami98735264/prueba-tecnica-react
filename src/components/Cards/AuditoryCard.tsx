import useColors from "../../hooks/useColors";
import { Icon } from "@iconify/react";
import { AuditoryCardProps } from "../../types";

const AuditoryCard = ({ icon, description }: AuditoryCardProps) => {
  const { color } = useColors();

  const styles = {
    description: {
      fontSize: "var(--font-size-medium)",
      color: color.copy,
      fontWeight: 400,
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
    </div>
  );
};

export default AuditoryCard;
