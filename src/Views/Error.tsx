import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <Card>
                <h2 style={styles.errorTitle}>Algo salió mal</h2>
                <p>No pudimos procesar su solicitud.</p>

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
    errorTitle: {
        color: "#ef4444",
    },
    button: {
        marginTop: "15px",
        padding: "10px 16px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#ef4444",
        color: "white",
        cursor: "pointer",
    },
};