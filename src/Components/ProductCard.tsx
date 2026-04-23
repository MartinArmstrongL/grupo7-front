import Card from "./Card";
import type { Product } from "../Structs/Product";
type ProductCardProps = {
    product: Product;
    onAdd: (product: Product) => void;
};
export default function ProductCard({ product, onAdd }: ProductCardProps) {
    return (
        <Card style={{ width: "200px", textAlign: "center" }}>
            <h3>{product.name}</h3>
            <p>Cantidad disponible: {product.quantity}</p>
            <p>Precio: ${product.price}</p>

            <button onClick={() => onAdd(product)}>
                Agregar al carro
            </button>
        </Card>
    );
}