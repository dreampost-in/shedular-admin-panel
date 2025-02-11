import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  // baseURL: "http://localhost:5000/api", // Replace with your API's base URL
  baseURL: "https://shedular-backend.vercel.app/api",
});

export default api;
