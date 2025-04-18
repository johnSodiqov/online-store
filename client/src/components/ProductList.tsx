// client/src/components/ProductList.tsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./ProductList.css";
import Table from "./Table";
import toast, { Toaster } from "react-hot-toast";
type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductList() {
  const queryClient = useQueryClient();
  const [modalStatus, setModalStatus] = useState(false);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () =>
      axios.get("http://localhost:3000/products").then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (newProduct: any) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast("Товар успешно добавлен!");
      // Очистка формы
      setNewProduct({
        name: "",
        price: "",
        description: "",
        stock: "",
        discount: "",
        img_URL: "",
      });
    },
    onError: () => {
      alert("Ошибка при добавлении товара.");
    },
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    discount: "",
    img_URL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productToSend = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
    };

    createMutation.mutate(productToSend);
  };

  function showModal(status) {
    setModalStatus(status);
  }

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className="container">
      <div className="header">
      <button onClick={() => showModal(true)}>Add Product</button>
      </div>
      {modalStatus && (
        <div className="add-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              placeholder="Price"
            />
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
              placeholder="Stock"
            />
            <input
              type="number"
              name="discount"
              value={newProduct.discount}
              onChange={handleChange}
              placeholder="Discount"
            />
            <input
              type="text"
              name="img_URL"
              value={newProduct.img_URL}
              onChange={handleChange}
              placeholder="Image URL"
            />
            <div>
              <button type="submit">Добавить</button>
              <button onClick={()=>showModal(false)}>Close</button>
            </div>
          </form>
        </div>
      )}

      <Table />
    </div>
  );
}
