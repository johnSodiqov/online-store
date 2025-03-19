import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, createProduct } from "../api/product";
import { useState } from "react";
import "./HomePage.css"

function HomePage() {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Обновляем список товаров
    },
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutation.mutate({
      ...newProduct,
      price: Number(newProduct.price),
      discount: String(newProduct.discount),
      stock: Number(newProduct.stock),
      description: String(newProduct.description),
    });
    setNewProduct({
      name: "",
      price: "",
      discount: "",
      stock: "",
      description: "",
    }); // Очищаем форму
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
          name="name"
          placeholder="Название товара"
          value={newProduct.name}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Цена"
          value={newProduct.price}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Скидка"
          value={newProduct.discount}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Количество"
          value={newProduct.stock}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="string"
          name="description"
          placeholder="Описание Товара"
          value={newProduct.description}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Добавить
        </button>
      </form>

      {/* Вывод списка товаров */}
      <ul className="border p-4 rounded-lg">
        {products.length === 0 ? (
          <p>Товаров нет</p>
        ) : (
          <table>
              <th>Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Stock</th>
              <th>Description</th>
            { products.map((product) => (
            // <li key={product.id} className="p-2 border-b">
            //   {product.name} - {product.price} USD
            // </li>
            <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.discount}</td>
                <td>{product.stock}</td>
                <td>{product.description}</td>
            </tr>
            
          ))}
          </table>
        )}
      </ul>
    </div>
  );
}

export default HomePage;
