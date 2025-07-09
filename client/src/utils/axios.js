import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // backend kamu
  withCredentials: true, // jika pakai auth token atau cookie
});

export default instance;
