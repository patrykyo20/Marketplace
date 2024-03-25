import axios from "axios";
import Product from "../_types/Product";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = 'http://localhost:1337/api';

const axiosClient = axios.create({
  baseURL:apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  }
})

const getLatestProducts = () => axiosClient.get('/products?populate=*')
const getProductById = (id: string) => axiosClient.get(`/products/${id}?populate=*`)

const getProductByCategory = (category: string | undefined) => axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`)

const postProductToCart = (data: any) => axiosClient.post('/carts', data)

const getUserCart = (email: string | undefined) => axiosClient.get(`/carts?populate[products][populate][0]=banner&filters[email][$eq]=${email}`)

const deleteUserCart = (productId: number) => axiosClient.delete(`/carts/${productId}`)
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getLatestProducts,
  getProductById,
  getProductByCategory,
  postProductToCart,
  getUserCart,
  deleteUserCart,
}