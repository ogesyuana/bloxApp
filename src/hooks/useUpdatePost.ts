import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';

export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: any }) => {
            const res = await axiosInstance.post(`users/${id}/posts`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gorest-user-post'] });
        }
    });
};
