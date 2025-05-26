import { axiosInstance } from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';

export type User = {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
};

export type Post = {
    id: number;
    user_id: number;
    title: string;
    body: string;
};

export const useGetUser = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['gorest-users'],
        queryFn: async () => {
            const res = await axiosInstance.get("/users");
            return res;
        }
    })

    return {
        data,
        isLoading
    }
}

export const useUserDetail = (id: string) => {
    return useQuery({
        queryKey: ['user-detail', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${id}`);
            return res.data;
        },
        enabled: !!id,
    });
};

export const usePostDetail = (id: string) => {
    return useQuery({
        queryKey: ['post-detail', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`users/${id}/posts`);
            return res.data;
        },
        enabled: !!id,
    });
};

export const useGetPost = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['gorest-user-post'],
        queryFn: async () => {
            const res = await axiosInstance.get("/posts");
            return res;
        }
    })

    return {
        data,
        isLoading
    }
}

export const useGetPostUser = () => {
    return useQuery({
        queryKey: ['gorest-user-post'],
        queryFn: async () => {
            const usersRes = await axiosInstance.get('/users');
            const users = usersRes.data;
            const postsPerUser = await Promise.all(
                users.map(async (user: any) => {
                    const postsRes = await axiosInstance.get(`/users/${user.id}/posts`);
                    return {
                        name: user.name,
                        postCount: postsRes.data.length,
                    };
                })
            );
            return { data: postsPerUser };
        },
    });
};

export const useGetUserPage = (page: number, perPage: number = 10) => {
    return useQuery({
        queryKey: ['gorest-users', page, perPage],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users?page=${page}&per_page=${perPage}`);
            return {
                data: res.data,
                total: parseInt(res.headers['x-total']) || 1000,
            };
        },
    });
};


export const useGetPostPage = (page: number, perPage: number = 10) => {
    return useQuery({
        queryKey: ['gorest-user-post', page, perPage],
        queryFn: async () => {
            const usersRes = await axiosInstance.get(`/users?page=${page}&per_page=${perPage}`);
            const users = usersRes.data;
            const total = parseInt(usersRes.headers['x-total']) || 1000;
            const postsPerUser = await Promise.all(
                users.map(async (user: any) => {
                    const postsRes = await axiosInstance.get(`/users/${user.id}/posts`);
                    const posts = postsRes.data;

                    if (!Array.isArray(posts) || posts.length === 0) return null;

                    const firstPost = posts[0];

                    return {
                        id: firstPost.id,
                        user_id: user.id,
                        name: user.name,
                        title: firstPost.title,
                        body: firstPost.body,
                    };
                })
            );
            const filteredPosts = postsPerUser.filter(Boolean);
            const allPosts = filteredPosts.flat();

            return { data: allPosts, total }
        },
    });
};

