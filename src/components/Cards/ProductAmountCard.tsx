import { Icon } from "@iconify/react";
import useColors from "../../hooks/useColors";
import { ProductAmountCardProps } from "../../types";

const ProductAmountCard = ({ amount, icon = "fluent:box-48-regular", gridStyles, text }: ProductAmountCardProps) => {
  const { color } = useColors();
  const styles = {
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      borderRadius: '4px',
      backgroundColor: color.foreground,
      border: `2px solid ${color.primary_light}`,
      gap: '8px',
      ...gridStyles,
    },
    text: {
      fontSize: 'var(--font-size-medium)',
      color: color.copy,
      fontWeight: 400,
    },
    amount: {
      fontSize: 'var(--font-size-stats-small-highlight)',
      color: color.primary,
      fontWeight: 600,
    }
  };

  return (
    <div className="product-amount-card" style={styles.container}>
      <Icon icon={icon} width="24" height="24" color={color.secondary} />
      <div className="product-amount-card__content">
        <p className="product-amount-card__amount" style={styles.amount}><b>x{amount}</b></p>
        <p className="product-amount-card__text" style={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default ProductAmountCard;
