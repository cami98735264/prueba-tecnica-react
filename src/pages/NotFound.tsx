import { Link } from 'react-router';
import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  content: {
    textAlign: 'center' as const,
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '90%'
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#666',
    marginBottom: '1rem'
  },
  message: {
    color: '#666',
    marginBottom: '1.5rem',
    lineHeight: 1.5
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease'
  },
  buttonHover: {
    backgroundColor: '#0056b3'
  }
};

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <h2 style={styles.subtitle}>Página no encontrada</h2>
        <p style={styles.message}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/" style={styles.button}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 