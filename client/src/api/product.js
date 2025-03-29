import axios from "axios";

const API_URL = "http://localhost:3000/products"; 

// Получение списка товаров
export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Добавление нового товара
export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`http://localhost:3000/products/${id}`);
};