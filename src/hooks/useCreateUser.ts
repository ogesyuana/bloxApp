import { axiosInstance } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

type CreateUser = {
    name: string;
    email: string;
    gender: string;
    status: string;
};

export const useCreateUser = () => {
    return useMutation({
        mutationFn: async (data: CreateUser) => {
            const res = await axiosInstance.post('/users', data);
            return res.data;
        },
    });
};
