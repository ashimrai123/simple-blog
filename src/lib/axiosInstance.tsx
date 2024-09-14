import axios from "axios";

// Set up Axios instance
export const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  params: {
    "Content-Type": "application/json",
  },
});
