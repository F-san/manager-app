import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginAPI } from "../services/auth";
import { setToken } from "../utils/auth";
import { Card, Form, Input, Button, Checkbox, message } from "antd";
function Login() {
  const { push } = useHistory();
  const [fields, setFields] = useState([
    {
      name: ["userName"],
      value: "admin",
    },
    {
      name: ["password"],
      value: "admin@12138",
    },
  ]);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = (values) => {
    loginAPI(values).then((res) => {
      // 调用登录接口
      if (res.code === "success") {
        message.success("登陆成功");
        setToken(res.token);
        push("/admin/products");
      } else {
        message.info(res.message);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    message.error("请填写完整信息");
  };

  return (
    <Card title="登录" bordered={true} className="login-form">
      <Form
        {...layout}
        name="basic"
        fields={fields}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="userName"
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
