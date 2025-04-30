import { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout/Layout";
import useColors from "../hooks/useColors";
import useProductStore from "../stores/products";
import { Icon } from "@iconify/react";
import Separator from "../components/Separator/Separator";
import SelectInput from "../components/Inputs/SelectInput";
import ProductCard from "../components/Cards/ProductCard";

const DeleteProduct = () => {
    const { color } = useColors();
    const navigate = useNavigate();
    const { products, removeProduct } = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [error, setError] = useState("");

    const productOptions = products.map(product => ({
        value: product.cod.toString(),
        label: `[#] COD ${product.cod} - ${product.name}`
    }));

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column" as const,
            gap: "16px",
            padding: "16px",
            backgroundColor: color.foreground,
            borderRadius: "4px",
            border: `2px solid ${color.primary_light}`,
            width: "100%",
        },
        formGroup: {
            display: "flex",
            flexDirection: "column" as const,
            gap: "8px",
        },
        label: {
            fontSize: "var(--font-size-medium)",
            color: color.copy,
            fontWeight: 500,
        },
        error: {
            color: "#ff3333",
            fontSize: "var(--font-size-small)",
            marginTop: "4px",
        },
        warning: {
            color: "#ff9900",
            fontSize: "var(--font-size-medium)",
            textAlign: "center" as const,
            fontWeight: 500,
        },
        buttonContainer: {
            display: "flex",
            gap: "8px",
            marginTop: "8px",
        },
        button: {
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            fontSize: "var(--font-size-medium)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
        },
        deleteButton: {
            backgroundColor: "#ff3333",
            color: "#fff",
        },
        cancelButton: {
            backgroundColor: color.copy_lighter,
            color: "#fff",
        },
        preview: {
            marginTop: "16px",
        },
    };

    const handleProductSelect = (value: string) => {
        const productId = parseInt(value);
        setSelectedProduct(productId);
        setError("");
    };

    const handleDelete = () => {
        if (!selectedProduct) {
            setError("Por favor seleccione un producto");
            return;
        }

        removeProduct(selectedProduct);
        navigate("/productos");
    };

    const selectedProductData = selectedProduct 
        ? products.find(p => p.cod === selectedProduct)
        : null;

    return (
        <Layout sectionTitle="Eliminar Producto" icon="mdi:delete">
            <form style={styles.container}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Seleccionar Producto</label>
                    <SelectInput
                        placeholder="Seleccione un producto"
                        options={productOptions}
                        onChange={handleProductSelect}
                    />
                </div>

                {selectedProductData && (
                    <div style={styles.preview}>
                        <p style={styles.warning}>
                            <Icon icon="mdi:alert" width="20" height="20" style={{ verticalAlign: "middle", marginRight: "8px" }} />
                            ¿Está seguro que desea eliminar este producto?
                        </p>
                        <ProductCard
                            code={selectedProductData.cod.toString()}
                            name={selectedProductData.name}
                            description={selectedProductData.description}
                            date={selectedProductData.createdAt}
                        />
                    </div>
                )}

                {error && <p style={styles.error}>{error}</p>}

                <Separator color="secondary" />

                <div style={styles.buttonContainer}>
                    <button
                        type="button"
                        style={{ ...styles.button, ...styles.deleteButton }}
                        onClick={handleDelete}
                        disabled={!selectedProduct}
                    >
                        <Icon icon="mdi:delete" width="20" height="20" />
                        Eliminar Producto
                    </button>
                    <button
                        type="button"
                        style={{ ...styles.button, ...styles.cancelButton }}
                        onClick={() => navigate("/productos")}
                    >
                        <Icon icon="mdi:close" width="20" height="20" />
                        Cancelar
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default DeleteProduct; 