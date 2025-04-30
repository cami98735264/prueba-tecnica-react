import { useState } from "react";
import Layout from "../components/Layout/Layout";
import SelectInput from "../components/Inputs/SelectInput";
import ProductCard from "../components/Cards/ProductCard";
import useColors from "../hooks/useColors";
import useProductStore from "../stores/products";
import { Icon } from "@iconify/react";
import Subtitle from "../components/Subtitles/Subtitle";

const Products = () => {
    const { color } = useColors();
    const { products } = useProductStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const itemsPerPage = 5;

    const sortOptions = [
        { value: "code_asc", label: "Código (menor a mayor)" },
        { value: "code_desc", label: "Código (mayor a menor)" },
        { value: "name_asc", label: "Nombre (A-Z)" },
        { value: "name_desc", label: "Nombre (Z-A)" },
        { value: "amount_asc", label: "Cantidad (menor a mayor)" },
        { value: "amount_desc", label: "Cantidad (mayor a menor)" },
        { value: "date_desc", label: "Fecha (más reciente)" },
        { value: "date_asc", label: "Fecha (más antigua)" }
    ];

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column" as const,
            gap: "12px",
            flex: 1,
        },
        searchContainer: {
            display: "flex",
            gap: "8px",
            alignItems: "center",
        },
        searchInput: {
            flex: 1,
            padding: "10px",
            backgroundColor: color.background,
            border: `2px solid ${color.primary_light}`,
            borderRadius: "4px",
            color: color.copy,
            fontSize: "var(--font-size-small)",
            outline: "none",
        },
        filterContainer: {
            display: "flex",
            flexDirection: "column" as const,
            gap: "12px",
        },
        filterRow: {
            display: "flex",
            gap: "8px",
        },
        filterSelect: {
            width: "200px",
        },
        productsGrid: {
            display: "flex",
            flexDirection: "column" as const,
            gap: "8px",
            flex: "1 1 350px",
            overflowY: "auto",
        },
        pagination: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            marginTop: "auto",
        },
        paginationText: {
            alignSelf: "flex-start",
            color: color.copy_light,
            fontSize: "var(--font-size-small)",
        },
        paginationButtons: {
            display: "flex",
            gap: "8px",
            alignItems: "center",
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
        pageNumber: {
            border: `2px solid ${color.secondary}`,
            fontSize: "var(--font-size-medium)",
            borderRadius: "4px",
            padding: "4px 12px",
            color: color.copy,
            cursor: "pointer",
            backgroundColor: "transparent",
        },
        activePage: {
            backgroundColor: color.secondary,
            color: color.primary_content,
        },
    };

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "code_asc":
                return a.cod - b.cod;
            case "code_desc":
                return b.cod - a.cod;
            case "name_asc":
                return a.name.localeCompare(b.name);
            case "name_desc":
                return b.name.localeCompare(a.name);
            case "amount_asc":
                return a.amount - b.amount;
            case "amount_desc":
                return b.amount - a.amount;
            case "date_asc":
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case "date_desc":
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default:
                return 0;
        }
    });

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <Layout sectionTitle="Lista de Productos" icon="fluent:box-24-filled">
            <div className="products-page" style={styles.container}>
                <div className="products-page__search" style={styles.searchContainer}>
                    <input
                        className="products-page__search-input"
                        type="text"
                        placeholder="Ingresa el nombre de un producto..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="products-page__filters" style={styles.filterContainer}>
                    <Subtitle icon="mdi:sort">Ordenar por</Subtitle>
                    <div className="products-page__filter-row" style={styles.filterRow}>
                        <div className="products-page__filter-select" style={styles.filterSelect}>
                            <SelectInput
                                placeholder="Selecciona un orden"
                                options={sortOptions}
                                onChange={(value) => setSortBy(value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="products-page__grid" style={styles.productsGrid}>
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product.cod}
                            code={product.cod.toString()}
                            name={`${product.amount} ${product.name}`}
                            description={product.description}
                            date={product.createdAt}
                        />
                    ))}
                </div>
                <div className="products-page__pagination" style={styles.pagination}>
                    <div className="products-page__pagination-text" style={styles.paginationText}>
                        Mostrando {currentProducts.length} resultados
                    </div>
                    <div className="products-page__pagination-buttons" style={styles.paginationButtons}>
                        <button
                            className="products-page__pagination-button"
                            style={styles.paginationButton}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            <Icon icon="mdi:chevron-left" width="24" height="24" color={color.copy} />
                        </button>
                        {getPageNumbers().map((pageNum) => (
                            <button
                                key={pageNum}
                                className={`products-page__pagination-number ${pageNum === currentPage ? 'products-page__pagination-number--active' : ''}`}
                                style={{
                                    ...styles.pageNumber,
                                    ...(pageNum === currentPage ? styles.activePage : {})
                                }}
                                onClick={() => setCurrentPage(pageNum)}
                            >
                                {pageNum}
                            </button>
                        ))}
                        <button
                            className="products-page__pagination-button"
                            style={styles.paginationButton}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <Icon icon="mdi:chevron-right" width="24" height="24" color={color.copy} />
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;