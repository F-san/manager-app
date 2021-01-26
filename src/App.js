import "./App.css";
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Products from "./pages/products/index";
import Productcategories from "./pages/product_categories/index";
import Login from "./pages/Login";
import Main from "./pages/main";

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/admin">
        <Main>
          <Route path="/admin/products" component={Products} />
          <Route path="/admin/pc" component={Productcategories} />
        </Main>
      </Route>
      <Redirect to="/login" from="/" />
    </Switch>
  );
}

export default App;
