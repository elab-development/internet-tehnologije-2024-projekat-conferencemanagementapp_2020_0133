import { useQuery } from "@tanstack/react-query"
import { conferencesApi } from "../api/conference/conferencesApi"



export const useConferences = (params = { limit: 0, topic: [], country: [], search: "", sortBy: "" }) => {
      const queryParams = new URLSearchParams(params).toString();
    return useQuery({
        queryKey: ['conferences', queryParams],
        queryFn: () => conferencesApi.getConferences(queryParams).then(res => res.data),
        staleTime: 30 * 60 * 1000, // 30 minuta - podaci će biti "sveži" 30 minuta
        cacheTime: 60 * 60 * 1000, // 1 sat - podaci će biti u cacheu 1 sat
        refetchOnWindowFocus: false, // Isključi refetch pri fokusu prozora
        refetchOnMount: false, // Isključi refetch pri mountovanju
        refetchOnReconnect: false, // Isključi refetch pri ponovnom povezivanju

    });
}

export const useConferenceById = (id) => {
    return useQuery({
        queryKey: ['conference', id],
        queryFn: () => conferencesApi.getConferenceById(id).then(res => res.data),
        enabled: !!id, // query će se pokrenuti samo ako je id definiran
    });
}

// export const useDeletePost = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (id) => postsApi.deletePost(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['posts'] });
//     },
//   });
// };

// export const useCreatePost = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (postData) => postsApi.createPost(postData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['posts'] });
//     },
//   });
// };