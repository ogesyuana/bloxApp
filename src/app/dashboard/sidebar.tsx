'use client';
import { AppstoreAddOutlined, LeftOutlined, MessageOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const pathToKey: Record<string, string> = {
    '/dashboard': '1',
    '/dashboard/create-user': '2',
    '/dashboard/create-post': '3',
};

const sidebarItem: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Dashboard',
        type: 'group',
        children: [
            {
                label: (
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                ),
                key: '1',
                icon: <AppstoreAddOutlined />,
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'sub2',
        label: 'Blog Management',
        type: 'group',
        children: [
            {
                label: (
                    <Link href="/dashboard/create-user">
                        Create User
                    </Link>
                ),
                key: '2',
                icon: <UserOutlined />,
            },
            {
                label: (
                    <Link href="/dashboard/create-post">
                        Create Post
                    </Link>
                ),
                key: '3',
                icon: <MessageOutlined />,
            },
        ],
    },
    {
        type: 'divider',
    },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const selectedKey = pathToKey[pathname] || '1';
    return (
        <Sider className='sidebar' trigger={null} collapsible collapsed={collapsed} collapsedWidth="70">
            <Button
                className='button-collapse'
                type="text"
                icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
                onClick={() => setCollapsed(!collapsed)}
            />
            <Menu
                className='menu-sidebar'
                selectedKeys={[selectedKey]}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={sidebarItem}
            />
            <div className="footer" style={{ color: '#787878', position: 'absolute', left: '20px', bottom: '30px' }}>
                <Flex justify='end' align='center' vertical>
                    <p className="text-xs">Copyright © 2024 <span className='font-bold'>BloX App</span></p>
                    <p className="text-xs">All Rights Reserved</p>
                    <p className="text-xs mt-3">App version 1.0.0</p>
                </Flex>
            </div>
        </Sider>
    )
}