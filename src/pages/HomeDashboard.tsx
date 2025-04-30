import { useState, useEffect } from "react";
import AuditoryCard from "../components/Cards/AuditoryCard";
import StatsCard from "../components/Cards/StatsCard";
import Layout from "../components/Layout/Layout";
import Separator from "../components/Separator/Separator";
import Subtitle from "../components/Subtitles/Subtitle";
import SelectInput from "../components/Inputs/SelectInput";
import { Icon } from "@iconify/react";
import useColors from "../hooks/useColors";
import ProductAmountCard from "../components/Cards/ProductAmountCard";
import useProductStore from "../stores/products";
import useAuditoryStore from "../stores/auditories";

const AuditoriasContainer = ({ currentPage, selectedProduct, sortBy }: { 
  currentPage: number, 
  selectedProduct: string,
  sortBy: string 
}) => {
  const { color } = useColors();
  const itemsPerPage = 4;
  const { getAuditories, getAuditoriesByProduct } = useAuditoryStore();

  const { auditories, total } = selectedProduct
    ? getAuditoriesByProduct(selectedProduct, currentPage, itemsPerPage)
    : getAuditories(currentPage, itemsPerPage);

  const sortedAuditories = [...auditories].sort((a, b) => {
    switch (sortBy) {
      case "date_desc":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case "date_asc":
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      case "name_asc":
        return a.description.localeCompare(b.description);
      case "name_desc":
        return b.description.localeCompare(a.description);
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  const styles = {
    container: {
      maxHeight: "200px",
      overflowY: "auto" as React.CSSProperties["overflowY"],
      display: "flex",
      flex: 1,
      flexDirection: "column" as React.CSSProperties["flexDirection"],
      gap: "8px",
    },
    emptyState: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      color: color.copy_light,
      fontSize: "var(--font-size-small)",
      textAlign: "center" as const,
      padding: "20px",
    }
  };

  if (total === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          No hay registros de auditoría disponibles
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {sortedAuditories.map((auditory) => (
        <AuditoryCard
          key={auditory.id}
          icon="mdi:user"
          description={auditory.description}
          buttonIcon="mdi:eye"
          buttonLabel="Revisar"
        />
      ))}
    </div>
  );
};

const AuditoriasPagination = ({ currentPage, setCurrentPage, selectedProduct }: { 
  currentPage: number, 
  setCurrentPage: (page: number) => void,
  selectedProduct: string 
}) => {
  const { color } = useColors();
  const itemsPerPage = 4;
  const { getAuditories, getAuditoriesByProduct } = useAuditoryStore();

  const { total } = selectedProduct
    ? getAuditoriesByProduct(selectedProduct, currentPage, itemsPerPage)
    : getAuditories(currentPage, itemsPerPage);

  const styles = {
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      flexWrap: "wrap" as const,
    },
    paginationText: {
      alignSelf: "flex-start",
      color: color.copy_light,
      fontSize: "var(--font-size-small)",
    },
    paginationButtons: {
      display: "flex",
      gap: "8px",
    },
    paginationButton: {
      border: `2px solid ${color.secondary}`,
      fontSize: "var(--font-size-medium)",
      borderRadius: "4px",
      padding: "4px 12px",
      color: color.copy,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
    },
  };

  return (
    <div style={styles.pagination}>
      <div style={styles.paginationText}>
        Mostrando {Math.min(itemsPerPage, total)} resultados de {total}
      </div>
      <div style={styles.paginationButtons}>
        <button 
          style={styles.paginationButton}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <Icon icon="mdi:chevron-left" width="24" height="24" color={color.copy} />
        </button>
        <button 
          style={styles.paginationButton}
          onClick={() => setCurrentPage(Math.min(Math.ceil(total / itemsPerPage), currentPage + 1))}
          disabled={currentPage === Math.ceil(total / itemsPerPage)}
        >
          <Icon icon="mdi:chevron-right" width="24" height="24" color={color.copy} />
        </button>
      </div>
    </div>
  );
};

const HomeDashboard = () => {
  const { color } = useColors();
  const { products } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [auditPage, setAuditPage] = useState(1);
  const [productsPage, setProductsPage] = useState(1);
  const [auditSortBy, setAuditSortBy] = useState("");
  const [productsSortBy, setProductsSortBy] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const productOptions = products.map(product => ({
    value: product.name,
    label: `[#] COD ${product.cod} - ${product.name}`
  }));

  const sortOptions = [
    { value: "date_desc", label: "Fecha (más reciente)" },
    { value: "date_asc", label: "Fecha (más antigua)" },
    { value: "name_asc", label: "Nombre (A-Z)" },
    { value: "name_desc", label: "Nombre (Z-A)" }
  ];

  const handleProductSelect = (value: string) => {
    setSelectedProduct(value);
    setAuditPage(1); // Reset pagination when product changes
  };

  const styles = {
    stats: {
      flex: 1,
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
      gridTemplateRows: isMobile ? "auto" : "repeat(8, 1fr)",
      gap: "8px",
      padding: isMobile ? "12px" : "0",
    },
    statsProductNumber: {
      gridColumn: isMobile ? "1 / -1" : "span 2 / span 2",
      gridRow: isMobile ? "auto" : "span 4 / span 4",
    },
    statsProductNewest: {
      gridColumn: isMobile ? "1 / -1" : "span 2 / span 2",
      gridRow: isMobile ? "auto" : "span 2 / span 2",
      gridColumnStart: isMobile ? 1 : 3,
    },
    statsProductOldest: {
      gridColumn: isMobile ? "1 / -1" : "span 2 / span 2",
      gridRow: isMobile ? "auto" : "span 2 / span 2",
      gridColumnStart: isMobile ? 1 : 3,
      gridRowStart: isMobile ? "auto" : 3,
    },
    auditoria: {
      display: "flex",
      flexDirection: "column" as React.CSSProperties["flexDirection"],
      padding: "12px",
      gap: "8px",
      backgroundColor: color.foreground,
      border: `2px solid ${color.primary_light}`,
      borderRadius: "4px",
      gridColumn: isMobile ? "1 / -1" : "span 2 / span 2",
      gridRow: isMobile ? "auto" : "span 4 / span 4",
      gridRowStart: isMobile ? "auto" : 5,
    },
    latestProducts: {
      display: "flex",
      flexDirection: "column" as React.CSSProperties["flexDirection"],
      padding: "12px",
      gap: "8px",
      backgroundColor: color.foreground,
      border: `2px solid ${color.primary_light}`,
      borderRadius: "4px",
      gridColumn: isMobile ? "1 / -1" : "span 2 / span 2",
      gridRow: isMobile ? "auto" : "span 4 / span 4",
      gridColumnStart: isMobile ? 1 : 3,
      gridRowStart: isMobile ? "auto" : 5,
    },
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      flexWrap: "wrap" as const,
    },
    paginationText: {
      alignSelf: "flex-start",
      color: color.copy_light,
      fontSize: "var(--font-size-small)",
    },
    paginationButtons: {
      display: "flex",
      gap: "8px",
    },
    paginationButton: {
      border: `2px solid ${color.secondary}`,
      fontSize: "var(--font-size-medium)",
      borderRadius: "4px",
      padding: "4px 12px",
      color: color.copy,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
    },
  };

  // Get the newest and oldest products
  const sortedProducts = [...products].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const newestProduct = sortedProducts[0];
  const oldestProduct = sortedProducts[sortedProducts.length - 1];

  // Group products by name and count them
  const productCounts = products.reduce((acc, product) => {
    acc[product.name] = (acc[product.name] || 0) + product.amount;
    return acc;
  }, {} as Record<string, number>);

  let productCountArray = Object.entries(productCounts)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => {
      switch (productsSortBy) {
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "amount_asc":
          return a.amount - b.amount;
        case "amount_desc":
          return b.amount - a.amount;
        default:
          return b.amount - a.amount; // Default sort by amount descending
      }
    })
    .slice((productsPage - 1) * 4, productsPage * 4);

  const totalProductPages = Math.ceil(Object.keys(productCounts).length / 4);

  return (
    <Layout sectionTitle="Dashboard Principal" icon={"mdi:home"}>
      <div style={styles.stats}>
        <StatsCard
          highlight={products.length.toString()}
          description="PRODUCTOS LISTADOS"
          icon="tabler:cube"
          gridStyles={styles.statsProductNumber}
          textSize="large"
        />
        <StatsCard
          highlight={newestProduct?.name || "N/A"}
          description="PRODUCTO MÁS RECIENTE"
          icon="mdi:recent"
          iconSize={40}
          gridStyles={styles.statsProductNewest}
          textSize="small"
        />
        <StatsCard
          highlight={oldestProduct?.name || "N/A"}
          description="PRODUCTO MÁS ANTIGUO"
          icon="ion:timer"
          gridStyles={styles.statsProductOldest}
          iconSize={40}
        />
        <div style={styles.auditoria}>
          <Subtitle icon="mdi:check-all">Auditoría de Productos</Subtitle>
          <Separator color="secondary" />
          <SelectInput 
            placeholder="Ordenar por"
            options={sortOptions}
            onChange={setAuditSortBy}
          />
          <AuditoriasContainer 
            currentPage={auditPage} 
            selectedProduct={selectedProduct} 
            sortBy={auditSortBy}
          />
          <AuditoriasPagination 
            currentPage={auditPage} 
            setCurrentPage={setAuditPage} 
            selectedProduct={selectedProduct} 
          />
        </div>
        <div style={styles.latestProducts}>
          <Subtitle icon="mdi:clock-outline">Productos más numerosos</Subtitle>
          <Separator color="secondary" />
          <div style={{ 
            display: "flex", 
            gap: "8px", 
            flexWrap: "wrap", 
            flex: 1,
            justifyContent: isMobile ? "center" : "flex-start"
          }}>
            {productCountArray.length > 0 ? (
              productCountArray.map(({ name, amount }) => (
                <ProductAmountCard 
                  key={name}
                  amount={amount} 
                  text={name}
                />
              ))
            ) : (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                color: color.copy_light,
                fontSize: "var(--font-size-small)",
                textAlign: "center",
                padding: "20px",
              }}>
                No hay productos registrados en el sistema
              </div>
            )}
          </div>
          <div style={styles.pagination}>
            <div style={styles.paginationText}>
              Mostrando {productCountArray.length} resultados
            </div>
            <div style={styles.paginationButtons}>
              <button 
                style={styles.paginationButton}
                onClick={() => setProductsPage(Math.max(1, productsPage - 1))}
                disabled={productsPage === 1}
              >
                <Icon icon="mdi:chevron-left" width="24" height="24" color={color.copy} />
              </button>
              <button 
                style={styles.paginationButton}
                onClick={() => setProductsPage(Math.min(totalProductPages, productsPage + 1))}
                disabled={productsPage === totalProductPages}
              >
                <Icon icon="mdi:chevron-right" width="24" height="24" color={color.copy} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeDashboard;
