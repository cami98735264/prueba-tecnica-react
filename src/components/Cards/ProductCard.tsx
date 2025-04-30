import { Icon } from "@iconify/react";
import useColors from "../../hooks/useColors";
import { ProductCardProps } from "../../types";

const ProductCard = ({ code, name, description, date, gridStyles }: ProductCardProps) => {
  const { color } = useColors();

  const styles = {
    container: {
      flex: 1,
      display: 'flex',
      padding: '12px',
      borderRadius: '4px',
      backgroundColor: color.foreground,
      border: `2px solid ${color.primary_light}`,
      gap: '12px',
      minWidth: '300px',
      ...gridStyles,
    },
    codeContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    code: {
      color: color.copy,
      fontSize: 'var(--font-size-medium)',
      fontWeight: 600,
    },
    name: {
      color: color.copy,
      fontSize: 'var(--font-size-medium)',
      fontWeight: 500,
    },
    description: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flex: 1,
    },
    descriptionText: {
      color: color.copy_light,
      fontSize: 'var(--font-size-medium)',
    },
    date: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    dateText: {
      color: color.copy_lighter,
      fontSize: 'var(--font-size-small)',
    },
    content: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px',
      flex: 1,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  };

  return (
    <div className="product-card" style={styles.container}>
      <Icon icon="fluent:box-48-regular" width="24" height="24" color={color.secondary} />
      <div className="product-card__content" style={styles.content}>
        <div className="product-card__header" style={styles.header}>
          <div className="product-card__code-container" style={styles.codeContainer}>
            <span className="product-card__code" style={styles.code}>[#] COD {code}</span>
            <span className="product-card__name" style={styles.name}>x{name}</span>
          </div>
          <div className="product-card__date" style={styles.date}>
            <Icon icon="mdi:calendar" width="16" height="16" color={color.copy_lighter} />
            <span className="product-card__date-text" style={styles.dateText}>{date}</span>
          </div>
        </div>
        <div className="product-card__description" style={styles.description}>
          <Icon icon="mdi:information" width="16" height="16" color={color.primary} />
          <span className="product-card__description-text" style={styles.descriptionText}>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
