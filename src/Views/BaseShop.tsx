import ProductCard from "../Components/ProductCard";
import { useCart } from "../Contex/CartContex";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authStorage } from "../Contex/AuthStorage";
import type { Product } from "../Structs/Product";
import type { ProductFromAPI } from "../Structs/ProductFromProducts";
export default function BaseShop() {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = authStorage.getToken();
        const response2 = await fetch(
          `${import.meta.env.VITE_API_URL}/products`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stores/checkout/inventory`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const inventory = await response.json();
        const productsBase = await response2.json();

        const productMap = new Map<string, ProductFromAPI>(
          productsBase.map((p: ProductFromAPI) => [p.sku, p])
        );

        const finalProducts = inventory.map((item: any) => {
          const product = productMap.get(item.sku);

          return {
            sku: item.sku,
            quantity: item.quantity,
            name: product?.name,
            price: product?.price
          };
        });

        setProducts(finalProducts);
      } catch (err) {
        console.error(err);
        setError("Could not load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <div>
    <p>{error}</p>
    <button
      style={styles.backButton}
      onClick={() => navigate("/")}
    >
      Ir a Iniciar Sesión
    </button>
  </div>

  return (
    <div>
      <div style={styles.topBar}>
        <button style={styles.cartButton} onClick={() => navigate("/cart")}>
          Ir al carro ({totalItems})
        </button>
      </div>

      <div style={styles.container}>
        {products.map((product) => (
          <ProductCard
            key={product.sku}
            product={product}
            onAdd={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "20px",
  },

  container: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap" as const,
    marginTop: "20px",
  },

  cartButton: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#22c55e",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  backButton: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};