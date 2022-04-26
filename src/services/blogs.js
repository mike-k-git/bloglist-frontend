import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const comment = async ({ id, text }) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { text });
  return response.data;
};

const update = async (blogToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${blogToUpdate.id}`,
    blogToUpdate
  );
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export const blogService = {
  getAll,
  create,
  setToken,
  update,
  remove,
  comment,
};
