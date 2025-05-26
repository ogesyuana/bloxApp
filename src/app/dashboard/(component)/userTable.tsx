'use client';
import React, { useState } from 'react';
import { Table, Input, Select, Space, Button, Dropdown, Modal, MenuProps, message } from 'antd';
import { EllipsisOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useGetUserPage } from '@/hooks/useGetData';
import { useRouter } from "next/navigation";
import { useDeleteUser } from '@/hooks/useDeleteUser';

const { Option } = Select;
const { confirm } = Modal;

type User = {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
};


export default function UserTable() {
    const router = useRouter();
    const { mutate: deleteUser } = useDeleteUser();
    const [genderFilter, setGenderFilter] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const perPage = 10;

    const { data: users, isLoading } = useGetUserPage(page, perPage);

    const filteredData = users?.data?.filter((user: any) => {
        return (
            (!genderFilter || user.gender === genderFilter) &&
            (!statusFilter || user.status === statusFilter) &&
            (user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()))
        );
    });

    const showDeleteConfirm = (user: User) => {
        confirm({
            title: 'Are you sure delete this user?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteUser({ id: user.id }, {
                    onSuccess: () => {
                        message.success('User deleted successfully');
                    },
                    onError: (err: any) => {
                        const errorList = err?.response?.data;
                        if (Array.isArray(errorList)) {
                            errorList.forEach((e: any) => {
                                message.error(`${e.field}: ${e.message}`);
                            });
                        } else {
                            message.error('Failed to delete user.');
                        }
                    }
                });
            },
        });
    };

    const handleEdit = (user: User) => {
        router.push(`/dashboard/create-user?id=${user.id}`);
    };

    const columns: ColumnsType<User> = [
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' },
            ],
            onFilter: (value, record) => record.gender === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Active', value: 'active' },
                { text: 'Inactive', value: 'inactive' },
            ],
            onFilter: (value, record) => record.status === value,
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
            <Space style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Space>
                    <Select
                        placeholder="Gender"
                        allowClear
                        onChange={(value) => setGenderFilter(value || null)}
                        style={{ width: 120 }}
                    >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                    <Select
                        placeholder="Status"
                        allowClear
                        onChange={(value) => setStatusFilter(value || null)}
                        style={{ width: 120 }}
                    >
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                    </Select>
                </Space>
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
