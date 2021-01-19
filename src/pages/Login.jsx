import React from "react";
import { useHistory } from "react-router-dom";
import { setToken } from "../utils/auth";
import { Card } from "antd";
function Login() {
  const { push } = useHistory();
  const loginHandle = () => {
    setToken("aaaaaa");
    push("/users");
  };
  return (
    <Card title="登录">
      <h1>Login</h1>
      <button onClick={loginHandle}>Login</button>
    </Card>
  );
}

export default Login;
