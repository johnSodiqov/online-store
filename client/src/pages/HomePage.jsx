import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, createProduct } from "../api/product";
import { useState } from "react";

function HomePage() {
  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Обновляем список
    },
  });

  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ ...newProduct, price: Number(newProduct.price) });
    setNewProduct({ name: "", price: "" }); // Очищаем форму
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Список товаров</h1>

      {/* Форма для добавления товара */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Название товара"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Цена"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Добавить</button>
      </form>

      {/* Вывод списка товаров */}
      <ul className="border p-4 rounded-lg">
        {products.length === 0 ? <p>Товаров нет</p> : products.map((product) => (
          <li key={product.id} className="p-2 border-b">{product.name} - {product.price} USD</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
