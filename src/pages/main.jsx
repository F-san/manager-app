/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UnorderedListOutlined,
  BarcodeOutlined,
  GithubOutlined,
  GiftOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function Main({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { push } = useHistory();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ color: "#fff", fontSize: "1.5rem", textAlign: "center" }}>
          <GiftOutlined />
        </div>
        <Menu
          // key为item的唯一值
          onClick={({ key }) => {
            push(key);
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="/admin/products" icon={<UnorderedListOutlined />}>
            商品列表
          </Menu.Item>
          <Menu.Item key="/admin/pc" icon={<BarcodeOutlined />}>
            商品分类
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            // createElement():创建并返回指定类型的新 React 元素
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span className="shop-title">商城后台管理</span>
          <a href="https://github.com/F-san/manager-app" target="_blank">
            <GithubOutlined
              style={{ width: "2rem", fontSize: "1.5rem", marginLeft: "1rem" }}
            />
          </a>
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
