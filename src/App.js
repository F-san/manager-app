import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Products from "./pages/Products";
import Productcategories from "./pages/Product_categories";
import Login from "./pages/Login";
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
    </>
  );
}

export default App;
