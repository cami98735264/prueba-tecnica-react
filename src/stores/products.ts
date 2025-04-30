import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import useAuditoryStore from './auditories'

interface Product {
    cod: number
    name: string
    description: string
    amount: number
    createdAt: string
}

interface ProductStore {
    products: Product[]
    addProduct: (product: Product) => void
    removeProduct: (cod: number) => void
    updateProduct: (cod: number, updatedProduct: Partial<Product>) => void
    clearProducts: () => void
    getProduct: (cod: number) => Product | undefined
}

const useProductStore = create<ProductStore>()(
    persist<ProductStore>(
        (set, get) => ({
            products: [],
            addProduct: (product) => {
                set((state) => ({ products: [...state.products, product] }));
                // Add auditory entry
                useAuditoryStore.getState().addAuditory({
                    productName: product.name,
                    action: 'add',
                    description: `El usuario añadió el producto "<b>${product.name}</b>" a las "<b>${new Date().toLocaleString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}</b>"`
                });
            },
            removeProduct: (cod) => {
                const product = get().products.find(p => p.cod === cod);
                if (product) {
                    set((state) => ({
                        products: state.products.filter((p) => p.cod !== cod)
                    }));
                    // Add auditory entry
                    useAuditoryStore.getState().addAuditory({
                        productName: product.name,
                        action: 'delete',
                        description: `El usuario eliminó el producto "<b>${product.name}</b>" a las "<b>${new Date().toLocaleString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}</b>"`
                    });
                }
            },
            updateProduct: (cod, updatedProduct) => {
                const oldProduct = get().products.find(p => p.cod === cod);
                if (oldProduct) {
                    set((state) => ({
                        products: state.products.map((product) =>
                            product.cod === cod ? { ...product, ...updatedProduct } : product
                        )
                    }));
                    // Add auditory entry
                    useAuditoryStore.getState().addAuditory({
                        productName: oldProduct.name,
                        action: 'update',
                        description: `El usuario actualizó el producto "<b>${oldProduct.name}</b>" a las "<b>${new Date().toLocaleString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}</b>"`
                    });
                }
            },
            clearProducts: () => set({ products: [] }),
            getProduct: (cod) => get().products.find((product) => product.cod === cod)
        }),
        {
            name: 'products-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useProductStore
