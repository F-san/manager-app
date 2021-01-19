import React, { Children, useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function Main({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { push } = useHistory();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          // key为item的唯一值
          onClick={({ key }) => {
            push(key);
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="/products" icon={<UserOutlined />}>
            商品列表
          </Menu.Item>
          <Menu.Item key="/pc" icon={<VideoCameraOutlined />}>
            商品分类
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span className="shop-title">商城后台管理</span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
