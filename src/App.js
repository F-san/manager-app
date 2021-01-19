import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Products from "./pages/Products";
import Productcategories from "./pages/Product_categories";
/* import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";

import User from "./pages/User";
 */

import Main from "./pages/main";
function App() {
  return (
    <>
      <Route path="/">
        <Main>
          <Route path="/products" component={Products} />
          <Route path="/pc" component={Productcategories} />
        </Main>
      </Route>
    </>
  );
}

export default App;
