import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isLogined } from "../utils/auth";
// ...rest表示除了children之外剩下的属性
function PrivateRoute({ children, ...rest }) {
  // 判断是否登录，若登录则跳转，若没登录，则跳转到登录页
  //   children是写在APP中的<PrivateRoute path="/login">中第一个<User/>
  return (
    <Route
      {...rest}
      render={() => (isLogined() ? children : <Redirect to="/login" />)}
    />
  );
}
export default PrivateRoute;
