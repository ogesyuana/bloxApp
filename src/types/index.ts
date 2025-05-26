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

export type UseGetPostUser = {
    id: number;
    name: string;
    postCount: number;
};


export type UseGetPostPage = {
    id: number,
    user_id: number,
    name: string,
    title: string,
    body: string,
}

export type PostTable = {
    id: number;
    user_id: number;
    name: string;
    title: string;
    body: string;
};

export type Login = {
    email: string;
    token: string;
    remember?: string;
};

export type UpdateUser = {
    name: string;
    email: string;
    gender: string;
    status: string;
};

export interface APIErrorDetail {
    field: string;
    message: string;
}
