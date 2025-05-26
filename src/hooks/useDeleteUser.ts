import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from "@/libs/axios";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            const res = await axiosInstance.delete(`/users/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gorest-users'] });
            queryClient.invalidateQueries({ queryKey: ['gorest-user-post'] });
        },
    });
};