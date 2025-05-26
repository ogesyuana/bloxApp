import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from "@/libs/axios";

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const res = await axiosInstance.put(`/users/${id}`, data);
            return res.data;
        },
    });
};