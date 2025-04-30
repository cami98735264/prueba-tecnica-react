import { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout/Layout";
import useColors from "../hooks/useColors";
import useProductStore from "../stores/products";
import { Icon } from "@iconify/react";

const AddProduct = () => {
    const { color } = useColors();
    const navigate = useNavigate();
    const { products, addProduct } = useProductStore();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        amount: 1,
    });
    const [error, setError] = useState("");

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
        input: {
            padding: "10px",
            backgroundColor: color.background,
            border: `2px solid ${color.primary_light}`,
            borderRadius: "4px",
            color: color.copy,
            fontSize: "var(--font-size-small)",
            outline: "none",
        },
        error: {
            color: "#ff3333",
            fontSize: "var(--font-size-small)",
            marginTop: "4px",
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
        submitButton: {
            backgroundColor: color.primary,
            color: "#fff",
        },
        cancelButton: {
            backgroundColor: color.copy_lighter,
            color: "#fff",
        },
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim() || !formData.description.trim()) {
            setError("Todos los campos son requeridos");
            return;
        }

        // Generate a unique code
        const newCode = products.length > 0 
            ? Math.max(...products.map(p => p.cod)) + 1 
            : 1;

        const newProduct = {
            cod: newCode,
            name: formData.name.trim(),
            description: formData.description.trim(),
            amount: formData.amount,
            createdAt: new Date().toISOString(),
        };

        addProduct(newProduct);
        navigate("/productos");
    };

    return (
        <Layout sectionTitle="Añadir Producto" icon="mdi:plus">
            <form onSubmit={handleSubmit} className="add-product-page" style={styles.container}>
                <div className="add-product-page__form-group" style={styles.formGroup}>
                    <label className="add-product-page__label" style={styles.label}>
                        Nombre del producto
                    </label>
                    <input
                        className="add-product-page__input"
                        type="text"
                        style={styles.input}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="add-product-page__form-group" style={styles.formGroup}>
                    <label className="add-product-page__label" style={styles.label}>
                        Descripción
                    </label>
                    <input
                        className="add-product-page__input"
                        type="text"
                        style={styles.input}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <div className="add-product-page__form-group" style={styles.formGroup}>
                    <label className="add-product-page__label" style={styles.label}>
                        Cantidad
                    </label>
                    <input
                        className="add-product-page__input"
                        type="number"
                        min="1"
                        style={styles.input}
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
                    />
                </div>
                {error && <div className="add-product-page__error" style={styles.error}>{error}</div>}
                <div className="add-product-page__buttons" style={styles.buttonContainer}>
                    <button
                        type="submit"
                        className="add-product-page__submit-button"
                        style={{ ...styles.button, ...styles.submitButton }}
                    >
                        <Icon icon="mdi:plus" width="20" height="20" />
                        Añadir Producto
                    </button>
                    <button
                        type="button"
                        className="add-product-page__cancel-button"
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

export default AddProduct; 