import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";

export default function CancelPage() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <Card>
                <h2 style={styles.cancelTitle}>Pago Cancelado</h2>
                <p>Ha cancelado el proceso de pago.</p>

                <button
                    style={styles.button}
                    onClick={() => navigate("/products")}
                >
                    Ir a Productos
                </button>
            </Card>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    cancelTitle: {
        color: "#f59e0b",
    },
    button: {
        marginTop: "15px",
        padding: "10px 16px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#f59e0b",
        color: "white",
        cursor: "pointer",
    },
};