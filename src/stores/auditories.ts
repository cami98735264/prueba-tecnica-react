import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Auditory {
    id: number
    productName: string
    action: 'add' | 'update' | 'delete'
    timestamp: string
    description: string
}

interface AuditoryStore {
    auditories: Auditory[]
    addAuditory: (auditory: Omit<Auditory, 'id' | 'timestamp'>) => void
    clearAuditories: () => void
    getAuditories: (page: number, limit: number) => {
        auditories: Auditory[]
        total: number
    }
    getAuditoriesByProduct: (productName: string, page: number, limit: number) => {
        auditories: Auditory[]
        total: number
    }
}

const useAuditoryStore = create<AuditoryStore>()(
    persist<AuditoryStore>(
        (set, get) => ({
            auditories: [],
            addAuditory: (auditory) => {
                const newAuditory: Auditory = {
                    id: get().auditories.length > 0 
                        ? Math.max(...get().auditories.map(a => a.id)) + 1 
                        : 1,
                    timestamp: new Date().toLocaleString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    }),
                    ...auditory
                };

                set((state) => ({
                    auditories: [newAuditory, ...state.auditories]
                }));
            },
            clearAuditories: () => set({ auditories: [] }),
            getAuditories: (page, limit) => {
                const start = (page - 1) * limit;
                const end = start + limit;
                const auditories = get().auditories.slice(start, end);
                return {
                    auditories,
                    total: get().auditories.length
                };
            },
            getAuditoriesByProduct: (productName, page, limit) => {
                const filteredAuditories = get().auditories.filter(
                    auditory => auditory.productName.toLowerCase().includes(productName.toLowerCase())
                );
                const start = (page - 1) * limit;
                const end = start + limit;
                return {
                    auditories: filteredAuditories.slice(start, end),
                    total: filteredAuditories.length
                };
            }
        }),
        {
            name: 'auditories-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useAuditoryStore; 