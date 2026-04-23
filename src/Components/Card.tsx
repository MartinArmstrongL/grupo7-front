import type { ReactNode } from "react";

export type CardProps = {
    image?: string;
    children?: ReactNode;
    style?: React.CSSProperties;
}

export default function Card({ children, style }: CardProps) {
    return (
        <div style={{ ...styles.card, ...style }}>
            {children}
        </div>
    );
}
const styles = {
    card: {
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
    },
};