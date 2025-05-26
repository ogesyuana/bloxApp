import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from "@/libs/axios";
import { UpdateUser } from '@/types';

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateUser }) => {
            const res = await axiosInstance.put(`/users/${id}`, data);
            return res.data;
        },
    });
};