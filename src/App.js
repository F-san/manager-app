import "./App.css";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Products from "./pages/products";
import Productcategories from "./pages/product_categories/index";
import Login from "./pages/login";
/* import PrivateRoute from "./components/PrivateRoute";
import User from "./pages/User";
 */
import Main from "./pages/main";

function App() {
  return (
    <>
      <Route path="/login" component={Login} />
      <Route path="/admin">
        <Main>
          <Route path="/admin/products" component={Products} />
          <Route path="/admin/pc" component={Productcategories} />
        </Main>
      </Route>
      <Redirect to="/login" from="/" />
    </>
  );
}

export default App;
