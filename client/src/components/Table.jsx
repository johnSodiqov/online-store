import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./Table.css";
import toast, { Toaster } from "react-hot-toast";

export default function Table() {
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const notify = () => toast("Edited");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axios.get("http://localhost:3000/products").then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/products/${id}`),
    onSuccess: () => 
      {
        queryClient.invalidateQueries({ queryKey: ["products"] })
        toast("Deleted")
      },
  });

  const updateMutation = useMutation({
    mutationFn: (p) =>
      axios.patch(`http://localhost:3000/products/${p.id}`, {
        name: p.name,
        price: p.price,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return (
    <div>
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
          {products?.map((product) => {
            return (
              <tr key={product.id}>
                <td>
                  {product.id.slice(0, 4)}...{product.id.slice(-4)}
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.ceratedAt}</td>
                <td>{product.discount}</td>
                <td>{product.img_URL.slice(12, 34)}...</td>
                <td>
                  <button className="action-btn" onClick={notify}>
                    Edit
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => deleteMutation.mutate(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
