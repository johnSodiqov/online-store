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

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function ProductList() {
  const queryClient = useQueryClient();
  const [modalStatus, setModalStatus] = useState(false);
  const [modalType, setModalType] = useState<"product" | "user" | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () =>
      axios.get("http://localhost:3000/products").then((res) => res.data),
  });

  const createProduct = useMutation({
    mutationFn: (newProduct: any) =>
      axios.post("http://localhost:3000/products", newProduct),
  });

  const createUser = useMutation({
    mutationFn: (newUser: any) =>
      axios.post("http://localhost:3000/users", newUser),
    onSuccess: () => {
      toast("Пользователь успешно добавлен!");
      setNewUser({ name: "", email: "", role: "" });
      setModalStatus(false);
    },
    onError: () => alert("Ошибка при добавлении пользователя."),
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    discount: "",
    img_URL: "",
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (modalType === "product") {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalType === "product") {
      const productToSend = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      };

      try {
        await toast.promise(createProduct.mutateAsync(productToSend), {
          loading: "Добавление...",
          success: "Товар успешно добавлен!",
          error: "Ошибка при добавлении товара.",
        });

        queryClient.invalidateQueries({ queryKey: ["productsAndUsers"] });

        setNewProduct({
          name: "",
          price: "",
          description: "",
          stock: "",
          discount: "",
          img_URL: "",
        });
        setModalStatus(false);
      } catch (error) {
        console.error("Ошибка при добавлении товара:", error);
      }
    } else {
      createUser.mutate(newUser, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["productsAndUsers"] });
          toast.success("Пользователь успешно добавлен!");
          setNewUser({ name: "", email: "", role: "" });
          setModalStatus(false);
        },
        onError: () => toast.error("Ошибка при добавлении пользователя."),
      });
    }
  };

  const showModal = (type: "product" | "user") => {
    setModalType(type);
    setModalStatus(true);
  };
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalStatus(false);
      setModalType(null);
      setIsClosing(false);
    }, 300);
  };

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className="product-list">
      <div
        className="sidebar w-100vw  d-flex"
        style={{ justifyContent: "space-between" }}
      >
        <h1>Products</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => showModal("product")}>Add Product</button>
          <button onClick={() => showModal("user")}>Add User</button>
        </div>
      </div>

      {modalStatus && (
        <div
          className={`add-form-overlay ${isClosing ? "closing" : ""}`}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("add-form-overlay")) {
              handleCloseModal();
            }
          }}
        >
          <div
            className={`add-form ${isClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              {modalType === "product" ? (
                <>
                  <h1>Add new product</h1>
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
                </>
              ) : (
                <>
                  <h1>Add new user</h1>
                  <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="role"
                    value={newUser.role}
                    onChange={handleChange}
                    placeholder="Role"
                  />
                </>
              )}
              <div className="form-buttons">
                <button type="submit">Добавить</button>
                <button
                  type="button"
                  onClick={() => {
                    handleCloseModal();
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table">
        <Table />
      </div>
    </div>
  );
}
