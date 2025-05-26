'use client';
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Flex, MenuProps, message, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        const name = localStorage.getItem('gorest_name') || sessionStorage.getItem('gorest_name');
        setUsername(name);
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('gorest_token');
        localStorage.removeItem('gorest_email');
        sessionStorage.removeItem('gorest_token');
        sessionStorage.removeItem('gorest_email');
        message.success('Logout successfully!');
        router.push('/login');
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'My Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            label: (
                <button onClick={handleLogout}>
                    Logout
                </button>
            ),
            icon: <LogoutOutlined />,
            key: '2',
        },
    ];
    return (
        <Header className='header-nav px-5 md:px-10'>
            <Flex className='w-screen' align="center" justify='space-between' vertical={false}>
                <div className="logo-vertical">
                    <Flex gap="small" align="center" vertical={false}>
                        <Image
                            src="/assets/img/logo.png"
                            alt="Next.js logo"
                            width={35}
                            height={35}
                        />
                        <Flex align="start" vertical>
                            <p className="text-sm font-bold">BloX App</p>
                            <p className="text-xs font-semibold hidden md:block">part of Great Applications</p>
                        </Flex>
                    </Flex>
                </div>
                <div className="user">
                    <Flex gap="small" align="center" vertical={false}>
                        <Avatar size={40} src={<img src={'/assets/img/avatar.png'} alt="avatar" />} />
                        <Flex className="hidden md:block" align="start" vertical>
                            <p className="text-sm font-bold">{username}</p>
                            <p className="text-xs font-bold" style={{ color: '#7C7C7C' }}>Superintendent</p>
                        </Flex>
                        <Dropdown className='ms-2 text-xs' menu={{ items }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </Flex>
                </div>
            </Flex>
        </Header>
    )
}