'use client';
import React, { useEffect } from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message, Select } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useCreateUser } from '@/hooks/useCreateUser';
import { useNotLogged } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { useUserDetail } from '@/hooks/useGetData';
import { APIErrorDetail, User } from '@/types';
import axios from 'axios';
const { Option } = Select;

export default function CreateUser() {
  useNotLogged();
  const router = useRouter();
  const [form] = Form.useForm<User>();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const { mutate: createUser, isPending: creating } = useCreateUser();
  const { mutate: updateUser, isPending: updating } = useUpdateUser();
  const { data: user } = useUserDetail(userId || '');

  useEffect(() => {
    if (userId && user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
      });
    }
  }, [userId, user, form]);

  const onFinish = (values: User) => {
    const payload = {
      name: values.name,
      email: values.email,
      gender: values.gender,
      status: values.status,
    };

    if (userId) {
      updateUser(
        { id: userId, data: payload },
        {
          onSuccess: () => {
            message.success('User updated!');
            form.resetFields();
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
                message.error('Failed to update user.');
              }
            } else {
              message.error('An unexpected error occurred.');
            }
          }
        }
      );
    } else {
      createUser(payload, {
        onSuccess: () => {
          message.success('User created successfully!');
          form.resetFields();
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
              message.error('Failed to create user.');
            }
          } else {
            message.error('An unexpected error occurred.');
          }
        }
      });
    }
  };
  return (
    <Content className='content-menu'>
      <div>
        <Flex gap="large" align="start" vertical>
          <div className="breadcrumb">
            <p className="text-base font-bold mb-2">Blog Management</p>
            <Flex style={{ color: `var(--primary)` }} gap="5px" align="center" vertical={false}>
              <AppstoreAddOutlined />
              <p className="text-xs font-semibold">Dashboard / <span className="text-xs font-bold" style={{ color: `var(--foreground)` }}>{userId ? 'Edit User' : 'Create User'}</span></p>
            </Flex>
          </div>

          <div className="create-user w-full">
            <p className="text-lg font-semibold mb-6 pb-1 border-b border-[#787878]">
              {userId ? 'Edit User' : 'Create User'}
            </p>
            <Form
              form={form}
              layout="vertical"
              name="user-form"
              initialValues={{ gender: 'male', status: 'active' }}
              autoComplete="off"
              onFinish={onFinish}
            >
              <Form.Item<User>
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please input full name!' }]}
              >
                <Input placeholder="Please fill user full name..." />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Please select gender!' }]}
              >
                <Select>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item<User>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input placeholder="Please fill the email..." />
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please select status!' }]}
              >
                <Select>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={creating || updating}
                  style={{ width: '100%', background: `var(--primary)`, color: `var(--background)` }}
                >
                  {userId ? 'Update' : 'Create'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Flex>
      </div>
    </Content>
  );
}