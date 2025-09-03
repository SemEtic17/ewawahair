import axios from 'axios';
import { Product } from '@/data/products';

const API_URL = '/api/product';

export async function getProducts(params?: Record<string, any>) {
  const res = await axios.get(`${API_URL}/getproducts`, { params });
  return res.data;
}

export async function addProduct(product: Omit<Product, 'id'>) {
  const res = await axios.post(API_URL, product);
  return res.data;
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}
