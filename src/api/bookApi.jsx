// src/api/bookApi.js
import axios from "axios";

const API_URL = "https://6734caeca042ab85d11ba5df.mockapi.io/Books";

export const getBooks = () => axios.get(API_URL);
export const getBookById = (id) => axios.get(`${API_URL}/${id}`);
export const createBook = (book) => axios.post(API_URL, book);
export const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
