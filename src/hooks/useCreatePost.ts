import { axiosInstance } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

type CreatePost = {
    user_id: number;
    title: string;
    body: string;
};

export const useCreatePost = () => {
    return useMutation({
        mutationFn: async (data: CreatePost) => {
            const res = await axiosInstance.post(`/users/${data.user_id}/posts`, data);
            return res.data;
        },
    });
};
