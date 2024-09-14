import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});
