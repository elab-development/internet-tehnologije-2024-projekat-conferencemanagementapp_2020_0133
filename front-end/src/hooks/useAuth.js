import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth/authApi";


export function useRegister() {
  return useMutation({
    mutationFn: (data) => authApi.register(data),
  });
}


export function useLogin() {
  return useMutation({
    mutationFn: (data) => authApi.login(data),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data) => authApi.forgotPassword(data),
  });
}


export function useResetPassword() {
  return useMutation({
    mutationFn: (data) => authApi.resetPassword(data),
  });
}