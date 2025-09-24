import axiosConferenceInstance from "../axiosConfig";

export const authApi = {
  register: (data) => axiosConferenceInstance.post("/auth/register", data),
  login: (data) => axiosConferenceInstance.post("/auth/login", data),
  forgotPassword: (data) => axiosConferenceInstance.post("/auth/forgot-password", data),
  resetPassword: (data) => axiosConferenceInstance.post("/auth/reset-password", data),
};