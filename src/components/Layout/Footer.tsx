import useColors from "../../hooks/useColors";
const Footer = () => {
    const { color } = useColors();
    const styles: { footer: React.CSSProperties } = {
        footer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px",
            backgroundColor: color.primary_dark,
            color: color.copy_lighter,
        }
    }
    return (
        <footer style={styles.footer}>
        <div>
            <p>&copy; {(new Date()).getFullYear()} Cristián Camilo Rodríguez Montealegre. Todos los derechos reservados.</p>
        </div>
        </footer>
    );
    }

export default Footer;