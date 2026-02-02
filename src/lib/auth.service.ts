import api from "./api";

export const loginApi = (email: string, password: string) => {
  return api.post("/api/auth/login", { email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
