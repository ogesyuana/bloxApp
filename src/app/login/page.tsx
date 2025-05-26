'use client';
import React from 'react';
import { Button, Checkbox, Col, Flex, Form, FormProps, Input, message, Row } from 'antd';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { validate } from '@/libs/axios';
import { useLogged } from '@/hooks/useAuth';

type FieldType = {
  email?: string;
  token: string;
  remember?: string;
};

export default function login() {
  useLogged();
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; token: string; remember: boolean; }) => {
    const { email, token, remember } = values;

    const res = await validate(token, email);
    if (res.valid) {
      if (remember) {
        localStorage.setItem('gorest_token', token);
        localStorage.setItem('gorest_email', email);
        localStorage.setItem('gorest_name', res.user.name);
      } else {
        sessionStorage.setItem('gorest_token', token);
        sessionStorage.setItem('gorest_email', email);
        sessionStorage.setItem('gorest_name', res.user.name);
      }

      message.success('Login successfully!');
      router.push('/dashboard');
    } else {
      message.error(res.error);
    }
  };
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={14} xl={14}>
        <Flex className="xl:p-[5rem] p-[2rem] min-h-screen" gap="70px" vertical>
          <div className="logo">
            <Flex gap="large" align="start" vertical={false}>
              <Image
                src="/assets/img/logo.png"
                alt="Next.js logo"
                width={50}
                height={50}
                priority
              />
              <p className="text-4xl font-semibold">BloX App</p>
            </Flex>
          </div>
          <div className="Form-center md:p-10">
            <p className="text-2xl mb-7 font-bold">Login</p>
            <Form
              form={form}
              layout='vertical'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input placeholder="Input your email....." />
              </Form.Item>

              <Form.Item<FieldType>
                label="Access Token"
                name="token"
                rules={[{ required: true, message: 'Please input your Access Token!' }]}
              >
                <Input.Password placeholder="input your Go REST access token....." />
              </Form.Item>

              <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" style={{ width: '100%', background: `var(--border)` }}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="footer mt-auto" style={{ color: '#787878' }}>
            <Flex justify='center' align='center' vertical>
              <p className="text-sm">Copyright © 2024 <span className='font-bold'>BloX App</span></p>
              <p className="text-sm">All Rights Reserved</p>
              <p className="text-sm mt-3">App version 1.0.0</p>
            </Flex>
          </div>
        </Flex>
      </Col >
      <Col lg={10} xl={10}>
        <div className="min-h-screen bg-[url(/assets/img/banner.png)] bg-cover bg-center"></div>
      </Col>
    </Row >
  );
}
