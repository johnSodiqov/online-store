import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";
import ProductList from "./components/ProductList";
import { Toaster } from "react-hot-toast";

const fetchProducts = async () => {
  const { data } = await axios.get("/products");
  return data;
};

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1 className="w-100">Продукты</h1>

      <ProductList />

      <Toaster
        containerStyle={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
          pointerEvents: "none", // Чтобы клики проходили сквозь
        }}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );
}

export default App;
