import { Icon } from "@iconify/react";
import useColors from "../../hooks/useColors";

const LoadingScreen = () => {
  const { color } = useColors();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: color.background,
      gap: '1rem'
    },
    icon: {
      animation: 'spin 1.5s linear infinite',
      fontSize: '3rem',
      color: color.primary
    },
    text: {
      fontSize: '1.2rem',
      color: color.copy,
      fontWeight: 500
    },
    dots: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    dot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: color.primary,
      animation: 'bounce 1.4s infinite ease-in-out both'
    },
    dot1: {
      animationDelay: '-0.32s'
    },
    dot2: {
      animationDelay: '-0.16s'
    }
  };

  return (
    <div style={styles.container}>
      <Icon 
        icon="fluent:box-24-filled" 
        style={styles.icon} 
      />
      <div style={styles.text}>Cargando</div>
      <div style={styles.dots}>
        <div style={{...styles.dot, ...styles.dot1}} />
        <div style={{...styles.dot, ...styles.dot2}} />
        <div style={styles.dot} />
      </div>
    </div>
  );
};

export default LoadingScreen; 