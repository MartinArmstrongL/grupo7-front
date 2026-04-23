import PayButton from "../Components/PayButton";
import { useCart } from "../Contex/CartContex";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
    const navigate = useNavigate();
    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <div>
            <h2 style={styles.title}>Tu carro</h2>

            {cartItems.length === 0 ? (
                <div>
                    <p>Tu carro esta vacio.</p>

                    <button
                        onClick={() => navigate("/products")}
                        style={styles.returnButton}
                    >
                        Seguir comprando
                    </button>
                </div>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item.product.sku} style={styles.item}>
                            <div>
                                <h3>{item.product.name}</h3>

                                <p>Cantidad en carro: {item.quantity}</p>
                                <p>Precio total: ${item.product.price * item.quantity}</p>

                                <button
                                    onClick={() =>
                                        removeFromCart(item.product.sku)
                                    }
                                >
                                    -
                                </button>

                                <button
                                    onClick={() =>
                                        addToCart(item.product)
                                    }
                                    style={{ marginLeft: "10px" }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}

                    <div style={styles.actions}>
                        <h3 style={styles.total}>
                            Total a pagar: ${totalAmount}
                        </h3>
                        <button
                            onClick={() => navigate("/products")}
                            style={styles.returnButton}
                        >
                            Seguir comprando
                        </button>

                        <PayButton amount={totalAmount} />

                        <button
                            onClick={clearCart}
                            style={styles.clearButton}
                        >
                            Vaciar carro
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

const styles = {
    item: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
        marginBottom: "10px",
    },
    actions: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap" as const,
    },
    returnButton: {
        padding: "10px 16px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#3b82f6",
        color: "white",
        cursor: "pointer",
    },
    title: {
        color: "black",
    },
    payButton: {
        padding: "10px 16px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#22c55e",
        color: "white",
        cursor: "pointer",
    },
    clearButton: {
        padding: "10px 16px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    total: {
        width: "100%",
        textAlign: "center" as const,
        marginBottom: "10px",
        fontSize: "18px",
        fontWeight: "bold" as const,
    },
};