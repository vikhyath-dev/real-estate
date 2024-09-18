import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-estate-jxs2.vercel.app/",
  withCredentials: true,
});

export default apiRequest;
