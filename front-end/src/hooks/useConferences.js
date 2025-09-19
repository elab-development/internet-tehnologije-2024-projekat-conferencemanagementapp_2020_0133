import { useQuery } from "@tanstack/react-query"
import { conferecesApi } from "../api/conference/conferencesApi"



export const useConferences = () => {
    return useQuery({
        queryKey: ['conferences'],
        queryFn: () => conferecesApi.getConferences().then(res => res.data)
    });
}

export const useConferenceById = (id) => {
    return useQuery({
        queryKey: ['conference', id],
        queryFn: () => conferecesApi.getConferenceById(id).then(res => res.data),
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