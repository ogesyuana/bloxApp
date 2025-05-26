'use client';
import React, { useEffect } from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Content } from 'antd/es/layout/layout';
import { useGetUser, usePostDetail } from '@/hooks/useGetData';
import { useCreatePost } from '@/hooks/useCreatePost';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNotLogged } from '@/hooks/useAuth';
import { APIErrorDetail, Post, User } from '@/types';
import axios from 'axios';

const { Option } = Select;

export default function CreatePost() {
    useNotLogged();
    const router = useRouter();
    const [form] = Form.useForm<Post>();
    const searchParams = useSearchParams();
    const userID = searchParams.get('id');

    const { data: users, isLoading: loadingUsers } = useGetUser();
    const { data: post } = usePostDetail(userID || '');
    const { mutate: createPost, isPending: creating } = useCreatePost();
    const { mutate: updatePost, isPending: updating } = useCreatePost();

    useEffect(() => {
        if (userID && post) {
            form.setFieldsValue({
                user_id: post[0].user_id,
                title: post[0].title,
                body: post[0].body
            });
        } else if (users?.data?.length > 0) {
            form.setFieldsValue({ user_id: users?.data[0].id });
        }
    }, [post, userID, users, form]);

    const onFinish = (values: Post) => {
        const payload = {
            user_id: values.user_id,
            title: values.title,
            body: values.body
        };

        if (userID) {
            updatePost(payload,
                {
                    onSuccess: () => {
                        message.success('Post updated successfully!');
                        router.push('/dashboard');
                    },
                    onError: (error: Error) => {
                        if (axios.isAxiosError(error)) {
                            const errorList = error.response?.data;

                            if (Array.isArray(errorList)) {
                                errorList.forEach((e: APIErrorDetail) => {
                                    message.error(`${e.field}: ${e.message}`);
                                });
                            } else {
                                message.error('Failed to update post.');
                            }
                        } else {
                            message.error('An unexpected error occurred.');
                        }
                    }
                }
            );
        } else {
            createPost(payload, {
                onSuccess: () => {
                    message.success('Post created successfully!');
                    form.resetFields(['title', 'body']);
                    form.setFieldsValue({ user_id: users?.data[0].id });
                    router.push('/dashboard');
                },
                onError: (error: Error) => {
                    if (axios.isAxiosError(error)) {
                        const errorList = error.response?.data;

                        if (Array.isArray(errorList)) {
                            errorList.forEach((e: APIErrorDetail) => {
                                message.error(`${e.field}: ${e.message}`);
                            });
                        } else {
                            message.error('Failed to create post.');
                        }
                    } else {
                        message.error('An unexpected error occurred.');
                    }
                }
            })
        }
    };

    const renderUsers = () => {
        return (users?.data as User[])?.map((user) => (
            <Option key={user.id} value={user.id}>
                {user.name}
            </Option>
        ));
    };

    return (
        <Content className='content-menu'>
            <div>
                <Flex gap="large" align="start" vertical>
                    <div className="breadcrumb">
                        <p className="text-base font-bold mb-2">Blog Management</p>
                        <Flex style={{ color: `var(--primary)` }} gap="5px" align="center">
                            <AppstoreAddOutlined />
                            <p className="text-xs font-semibold">
                                Dashboard / <span className='text-xs font-bold' style={{ color: `var(--foreground)` }}>{userID ? 'Edit Post' : 'Create Post'}</span>
                            </p>
                        </Flex>
                    </div>

                    <div className="create-user w-full">
                        <p className="text-lg font-semibold mb-6 pb-1 border-b border-[#787878]">{userID ? 'Edit Post' : 'Create Post'}</p>
                        <Form
                            form={form}
                            layout='vertical'
                            name="create-post"
                            autoComplete="off"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="User"
                                name="user_id"
                                rules={[{ required: true, message: 'Please select user!' }]}
                            >
                                <Select loading={loadingUsers}>
                                    {renderUsers()}
                                </Select>
                            </Form.Item>
                            <Form.Item<Post>
                                label="Title"
                                name="title"
                                rules={[{ required: true, message: 'Please input title!' }]}
                            >
                                <Input placeholder="Please fill post title..." />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="body"
                                rules={[{ required: true, message: 'Please input description!' }]}
                            >
                                <TextArea rows={4} placeholder="Please fill post description..." />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={creating || updating}
                                    style={{ width: '100%', background: `var(--primary)`, color: `var(--background)` }}
                                >
                                    {userID ? 'Update' : 'Create'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Flex>
            </div>
        </Content>
    );
}
