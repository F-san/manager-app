import "./App.css";
import React from "react";
import { Link, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Products from "./pages/Products";
import User from "./pages/User";
import Productcategories from "./pages/Product_categories";

function App() {
  return (
    <>
      <Link to="/login">登录 |</Link>
      <Link to="/products">商品列表 |</Link>
      <Link to="/users">个人中心 |</Link>
      <Link to="/">商品分类 </Link>
      <hr />
      <Route path="/" exact component={Productcategories} />
      <PrivateRoute path="/users">
        <User />
      </PrivateRoute>
      <Route path="/products" component={Products} />
      <Route path="/login" component={Login} />
    </>
  );
}

export default App;
