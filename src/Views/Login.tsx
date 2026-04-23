import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../Components/Card";
import { authStorage } from "../Contex/AuthStorage";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Username and password are required");
            return;
        }

        if (!/^\d+$/.test(username)) {
            alert("Username must contain numbers only");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        group: username,
                        secret: password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            authStorage.setToken(data.token);
            navigate("/products");
        } catch (error) {
            console.error(error);
            alert("Invalid credentials");
        }
    };

    return (
        <div style={styles.container}>
            <Card style={{ width: "300px" }}>
                <h2 style={styles.title}>Bienvenido</h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Grupo (solo números)"
                        value={username}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setUsername(value);
                            }
                        }}
                        inputMode="numeric"
                    />

                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button style={styles.button} type="submit">
                        Iniciar Sesión
                    </button>
                </form>
            </Card>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    form: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "12px",
        marginTop: "10px",
    },
    input: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "14px",
        color: "#979595",
        backgroundColor: "#fff",
    },
    button: {
        padding: "10px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#3b82f6",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
    },
    title: {
        color: "black",
    },
};