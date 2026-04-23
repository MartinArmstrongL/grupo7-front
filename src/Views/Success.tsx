import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <Card>
                <h2 style={styles.successTitle}>Pago realizado con éxito</h2>
                <p>Su pedido ha sido procesado exitosamente.</p>

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
    successTitle: {
        color: "#22c55e",
    },
    button: {
        marginTop: "15px",
        padding: "10px 16px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#22c55e",
        color: "white",
        cursor: "pointer",
    },
};