
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    providerId: string;
    providerName: string;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    setIsOpen: (open: boolean) => void;
    totalItems: () => number;
    subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (item) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i.id === item.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                        isOpen: true,
                    });
                    toast.success("Cart updated", {
                        description: `${item.name} quantity updated`,
                    });
                } else {
                    set({ items: [...currentItems, item], isOpen: true });
                    toast.success("Added to cart", {
                        description: `${item.name} added to your cart`,
                    });
                }
            },

            removeItem: (id) => {
                set({
                    items: get().items.filter((item) => item.id !== id),
                });
                toast.info("Item removed from cart");
            },

            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => set({ items: [] }),

            setIsOpen: (open) => set({ isOpen: open }),

            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

            subtotal: () =>
                get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: "food-hub-cart", // unique name for local storage
        }
    )
);
