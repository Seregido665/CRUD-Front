import apiClient from "./baseService";

export const getLibraries = () => {
  return apiClient.get("/libraries");
};

export const postLibrary = (library) => {
  return apiClient.post("/libraries", library);
};

export const deleteLibrary = (id) => {
  return apiClient.delete(`/libraries/${id}`);
};
