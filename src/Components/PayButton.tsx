import { useState } from "react";
import { authStorage } from "../Contex/AuthStorage";
type PayButtonProps = {
    amount: number;
};

export default function PayButton({ amount }: PayButtonProps) {
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        try {
            setLoading(true);

            const token = authStorage.getToken();


            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/payments/process`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                    body: JSON.stringify({ amount }),
                }
            );

            if (!response.ok) {
                throw new Error("Payment failed");
            }

            const data = await response.json();
            console.log("Payment response:", data);
            if (data.redirect_url) {
                window.location.href = data.redirect_url;
            } else {
                console.log("Payment response:", data);
            }
        } catch (err) {
            console.error(err);
            alert("Error initiating payment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handlePay} disabled={loading} style={styles.payButton}>
            {loading ? "Procesando..." : "Pagar"}
        </button>
    );
}

const styles = {
    payButton: {
        padding: "10px 16px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#22c55e",
        color: "white",
        cursor: "pointer",
    },
};