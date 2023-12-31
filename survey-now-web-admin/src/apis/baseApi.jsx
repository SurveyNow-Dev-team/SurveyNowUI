import axios from "axios";

const url = "https://survey-now-fptu.somee.com/";

const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

// config request Authenticate header
instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
