import { createContext, useContext, useState } from "react";
import type { Product } from "../Structs/Product";
import type { CartItem } from "../Structs/CartItem";
type CartContextType = {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productSku: string) => void;
    clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existing = prev.find(
                (item) => item.product.sku === product.sku
            );

            const currentQtyInCart = existing?.quantity ?? 0;

            const stockLimit = product.quantity;

            if (currentQtyInCart >= stockLimit) {
                alert(`Maxima cantidad de  ${product.sku} Alcanzada. Cantindad en carrito: ${currentQtyInCart} Stock disponible: ${stockLimit}`);
                return prev;
            }

            if (existing) {
                return prev.map((item) =>
                    item.product.sku === product.sku
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { product, quantity: 1 }];
        });
    };
    const removeFromCart = (productSku: string) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.product.sku === productSku
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };
    const clearCart = () => {
        setCartItems([]);
    };
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}