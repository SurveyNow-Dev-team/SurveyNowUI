import axios from "axios";

const URL = "http://survey-now.us-east-1.elasticbeanstalk.com/";

const instance = axios.create({
  baseURL: URL,
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
