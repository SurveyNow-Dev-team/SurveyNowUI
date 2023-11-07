import axios from "axios";

const url = "https://survey-now-fptu.somee.com/";

const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (credential) => {
  const response = await instance.post(
    "api/v1/authentication/login",
    credential
  );
  return response.data;
};
