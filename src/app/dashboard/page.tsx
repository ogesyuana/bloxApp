'use client';
import React from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Card, Col, Flex, Row, Tabs, TabsProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNotLogged } from '@/hooks/useAuth';
import EChartPost from './(component)/echartPost';
import EChartGender from './(component)/echartGender';
import { RenderTotalActive, RenderTotalGender, RenderTotalPost, RenderTotalUsers } from './(component)/componentData';
import EChartStatus from './(component)/echartStatus';
import UserTable from './(component)/userTable';
import PostTable from './(component)/postTable';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'User',
    children: <UserTable />,
  },
  {
    key: '2',
    label: 'Post',
    children: <PostTable />,
  },
];

export default function Dashboard() {
  useNotLogged();
  const totalUser = RenderTotalUsers();
  const totalPost = RenderTotalPost();
  const userStatus = RenderTotalActive();
  const userGender = RenderTotalGender();
  return (
    <Content className='content-menu'>
      <div>
        <Flex gap="large" align="start" vertical>
          <div className="breadcrumb">
            <p className="text-base font-bold mb-2">Dashboard</p>
            <Flex style={{ color: `var(--primary)` }} gap="5px" align="center" vertical={false}>
              <AppstoreAddOutlined />
              <p className="text-xs font-semibold">Dashboard</p>
            </Flex>
          </div>

          <div className="statisctic w-full">
            <p className="text-xs font-semibold mb-4">Statistic</p>
            <Row className="mb-5" gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Card className="rounded-lg shadow-sm px-2" style={{ border: `1px solid var(--border)` }} size="small">
                  <p className='text-xs text-gray-500 font-bold'>Total User</p>
                  <p className='text-2xl font-bold'>{totalUser}</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Card className="rounded-lg shadow-sm px-2" style={{ border: `1px solid var(--border)` }} size="small">
                  <p className='text-xs text-gray-500 font-bold'>Total Post</p>
                  <p className='text-2xl font-bold'>{totalPost}</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Card className="rounded-lg shadow-sm px-2" style={{ border: `1px solid var(--border)` }} size="small">
                  <p className='text-xs text-gray-500 font-bold'>User Status (active/non)</p>
                  <p className='text-2xl font-bold'>{userStatus[0]}/{userStatus[1]}</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Card className="rounded-lg shadow-sm px-2" style={{ border: `1px solid var(--border)` }} size="small">
                  <p className='text-xs text-gray-500 font-bold'>User Gender (m/f)</p>
                  <p className='text-2xl font-bold'>{userGender[0]}/{userGender[1]}</p>
                </Card>
              </Col>
            </Row>
            <Row className="mb-5" gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                <Card className="rounded-lg shadow-sm px-2 chart-container right" style={{ border: `1px solid var(--border)` }} size="small">
                  <EChartPost />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card className="rounded-lg shadow-sm px-2 chart-container left" style={{ border: `1px solid var(--border)` }} size="small">
                      <EChartStatus />
                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card className="rounded-lg shadow-sm px-2 chart-container left" style={{ border: `1px solid var(--border)` }} size="small">
                      <EChartGender />
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Tabs defaultActiveKey="1" items={items} />
          </div>
        </Flex>
      </div>
    </Content>
  );
}