import { useMutation } from "@tanstack/react-query";
import { paperApi } from "../api/paper/paperApi";

export function useSubmitPaper() {
  return useMutation({
    mutationFn: (data) => paperApi.submitPaper(data),
  });
}