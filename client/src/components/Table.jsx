import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./Table.css";
import toast from "react-hot-toast";

export default function Table() {
  const queryClient = useQueryClient();
  const [view, setView] = useState("products");

  const { data, isLoading } = useQuery({
    queryKey: ["productsAndUsers"],
    queryFn: async () => {
      const [productsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:3000/products"),
        axios.get("http://localhost:3000/users"),
      ]);
      return {
        products: productsRes.data,
        users: usersRes.data,
      };
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsAndUsers"] });
      toast.success("Product deleted");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsAndUsers"] });
      toast.success("User deleted");
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div >
      <div className="button-group">
        <button onClick={() => setView("products")}>Products</button>
        <button onClick={() => setView("users")}>Users</button>
      </div>

      {view === "products" ? (
        <table>
          <caption>Products</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created Date</th>
              <th>Discount</th>
              <th>Image URL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.products?.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.id.slice(0, 4)}...{product.id.slice(-4)}
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.createdAt}</td>
                <td>{product.discount}</td>
                <td>{product.img_URL?.slice(12, 34)}...</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => toast("Edit clicked")}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => deleteProductMutation.mutate(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table>
          <caption>Users</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.users?.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.id.slice(0, 4)}...{user.id.slice(-4)}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password.slice(0, 8)}***</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => toast("Edit clicked")}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => deleteUserMutation.mutate(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
    </div>
  );
}
