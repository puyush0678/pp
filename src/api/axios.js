import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchData = async (pageNum = 1, limit = 5, options) => {
  const data = await api.get(
    "https://jsonplaceholder.typicode.com/comments",
    { params: { _page: pageNum, _limit: limit } },
    options
  );
  return data.data;
};
