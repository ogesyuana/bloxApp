'use client';
import { useGetPost, useGetUser } from "@/hooks/useGetData";
import { Post, User } from "@/types";

export function RenderTotalUsers() {
    const { data: users } = useGetUser();
    const total = (users?.data)?.length || 0;
    return total;
}

export function RenderTotalGender() {
    const { data: users } = useGetUser();
    const user = users?.data || [];

    const totalMale = user.filter((user: User) => user.gender === 'male').length;
    const totalFemale = user.filter((user: User) => user.gender === 'female').length;
    const gender = [
        totalFemale,
        totalMale
    ]
    return gender;
}

export function RenderTotalActive() {
    const { data: users } = useGetUser();
    const user = users?.data || [];

    const totalActive = user.filter((user: User) => user.status === 'active').length;
    const totalInactive = user.filter((user: User) => user.status === 'inactive').length;
    const active = [
        totalActive,
        totalInactive
    ]
    return active;
}

export function RenderTotalPost() {
    const { data: posts } = useGetPost();
    const total = (posts?.data)?.length || 0;
    return total;
}

export function RenderUsers() {
    const { data: users } = useGetUser();
    return (users?.data as User[])?.map((user) => (
        <p key={user.id}>{user.name}</p>
    ));
}

export function RenderPosts() {
    const { data: posts } = useGetPost();
    return (posts?.data as Post[])?.map((post) => (
        <p key={post.id}>{post.title}</p>
    ));
}
