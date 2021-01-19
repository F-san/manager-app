import React from "react";
import { useHistory } from "react-router-dom";
import { setToken } from "../utils/auth";
function Login() {
  const { push } = useHistory();
  const loginHandle = () => {
    setToken("aaaaaa");
    push("/users");
  };
  return (
    <div>
      <h1>Login</h1>
      <button onClick={loginHandle}>Login</button>
    </div>
  );
}

export default Login;
