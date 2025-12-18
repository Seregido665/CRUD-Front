import apiClient from "./baseService";

export const getBooks = () => {
  return apiClient.get("/books");
};

export const deleteBook = (id) => {
  return apiClient.delete(`/books/${id}`);
};

export const getBookById = (id) => {
  return apiClient.get(`/books/${id}`);
};

export const postBook = (bookData) => {
  return apiClient.post("/books", bookData);
};

export const editBook = (id) => {
  return apiClient.patch(`/books/${id}`);
};

