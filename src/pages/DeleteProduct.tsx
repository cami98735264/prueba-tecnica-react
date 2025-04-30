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
            <form onSubmit={handleDelete} className="delete-product-page" style={styles.container}>
                <div className="delete-product-page__form-group" style={styles.formGroup}>
                    <label className="delete-product-page__label" style={styles.label}>
                        Seleccionar producto
                    </label>
                    <SelectInput
                        placeholder="Selecciona un producto"
                        options={productOptions}
                        onChange={handleProductSelect}
                    />
                </div>
                {selectedProduct && (
                    <>
                        <div className="delete-product-page__warning" style={styles.warning}>
                            ¿Estás seguro de que deseas eliminar este producto?
                        </div>
                        <div className="delete-product-page__preview" style={styles.preview}>
                            <ProductCard
                                code={selectedProduct.toString()}
                                name={products.find(p => p.cod === selectedProduct)?.name || ""}
                                description={products.find(p => p.cod === selectedProduct)?.description || ""}
                                date={products.find(p => p.cod === selectedProduct)?.createdAt || ""}
                            />
                        </div>
                    </>
                )}
                {error && <div className="delete-product-page__error" style={styles.error}>{error}</div>}
                <div className="delete-product-page__buttons" style={styles.buttonContainer}>
                    <button
                        type="submit"
                        className="delete-product-page__delete-button"
                        style={{ ...styles.button, ...styles.deleteButton }}
                        disabled={!selectedProduct}
                    >
                        <Icon icon="mdi:delete" width="20" height="20" />
                        Eliminar Producto
                    </button>
                    <button
                        type="button"
                        className="delete-product-page__cancel-button"
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