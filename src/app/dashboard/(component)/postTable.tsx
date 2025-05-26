'use client';
import React, { useState } from 'react';
import { Table, Input, Space, Button, Dropdown, Modal, MenuProps, message } from 'antd';
import { EllipsisOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useGetPostPage } from '@/hooks/useGetData';
import { useRouter } from "next/navigation";
import { useDeleteUser } from '@/hooks/useDeleteUser';
import { APIErrorDetail, PostTable, UseGetPostPage } from '@/types';
import axios from 'axios';

const { confirm } = Modal;


export default function UserTable() {
    const router = useRouter();
    const { mutate: deleteUser } = useDeleteUser();
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const perPage = 10;

    const { data: posts, isLoading } = useGetPostPage(page, perPage);

    const filteredData = posts?.data?.filter((post: UseGetPostPage) => {
        return (
            (post.name.toLowerCase().includes(search.toLowerCase()) ||
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase()))
        );
    });

    const showDeleteConfirm = (user: PostTable) => {
        confirm({
            title: 'Are you sure delete this user?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteUser({ id: user.user_id }, {
                    onSuccess: () => {
                        message.success('User deleted successfully');
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
                });
            },
        });
    };

    const handleEdit = (user: PostTable) => {
        router.push(`/dashboard/create-post?id=${user.user_id}`);
    };

    const columns: ColumnsType<PostTable> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text: number) => `#${text}`,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'body',
            key: 'body',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                const items: MenuProps['items'] = [
                    {
                        key: 'edit',
                        label: 'Edit',
                        onClick: () => handleEdit(record),
                    },
                    {
                        key: 'delete',
                        label: 'Delete',
                        danger: true,
                        onClick: () => showDeleteConfirm(record),
                    },
                ];

                return (
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <Button shape="round" icon={<EllipsisOutlined />} />
                    </Dropdown>
                );
            }
        }

    ];

    return (
        <div>
            <Space style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
                <Input
                    placeholder="Search name"
                    allowClear
                    prefix={<SearchOutlined />}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: 200 }}
                />
            </Space>

            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize: perPage,
                    total: 100,
                    onChange: (p) => setPage(p),
                }}
            />
        </div>
    );
}
