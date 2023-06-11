import axios from "axios";

export const baseURL = "http://localhost:8000/api";

export const axiosBase = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const axiosWithBearer = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "bearer " + localStorage.getItem("token"),
  },
});
