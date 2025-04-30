import Footer from "./Footer";
import Header from "./Header";
import type { LayoutProps, LayoutStyles } from "../../types";
import useColors from "../../hooks/useColors";
import Separator from "../Separator/Separator";
import { Icon } from "@iconify/react";

let navbarOptions = {
  title: "SISTEMA DE PRODUCTOS",
  links: [
    { name: "Productos", url: "/productos", icon: "fluent:box-24-filled" },
    {
      name: "Acciones",
      icon: "mdi:cog",
      dropdown: [
        { name: "Añadir producto", url: "/añadir-producto", icon: "mdi:plus" },
        {
          name: "Actualizar producto",
          url: "/actualizar-producto",
          icon: "mdi:pencil",
        },
        {
          name: "Eliminar producto",
          url: "/eliminar-producto",
          icon: "mdi:delete",
        },
      ],
    },
  ],
};

const Layout = ({ children, sectionTitle, icon }: LayoutProps) => {
  const { color } = useColors();
  const styles: LayoutStyles = {
    layout: {
      display: "flex",
      flexDirection: "column",
      height: "calc(100dvh)",
      backgroundColor: "#f0f0f0",
    },
    main: {
      backgroundColor: color.background,
      flex: 1,
      flexDirection: "column",
      display: "flex",
      gap: "6px",
      padding: "8px",
    },
    sectionTitle: {
      text: {
        fontSize: "var(--font-size-section-title)",
        color: color.copy,
        fontWeight: 600,
      },
      container: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
      },
    },
  };
  return (
    <div id="main-layout" className="layout" style={styles.layout}>
      <Header navbarOptions={navbarOptions} />
      <main className="layout__main" style={styles.main}>
        <div className="layout__section-title" style={styles.sectionTitle.container}>
          <Icon
            icon={icon || "mdi:alert-circle"}
            width="32"
            height="32"
            color={color.primary_light}
          />
          <h2 className="layout__section-title-text" style={styles.sectionTitle.text}>{sectionTitle}</h2>
        </div>
        <Separator color="primary" />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
