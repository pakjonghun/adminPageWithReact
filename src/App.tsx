import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Orders from "./pages/orders/Orders";
import ProductCreate from "./pages/products/CreateProducts";
import ProductEdit from "./pages/products/EditProduct";
import Products from "./pages/products/Products";
import Register from "./pages/Register";
import RoleCreate from "./pages/roles/CreateRole";
import RoleEdit from "./pages/roles/EditRole";
import Roles from "./pages/roles/Roles";
import Profile from "./pages/user/Profile";
import UserCreate from "./pages/user/UserCreate";
import UserEdit from "./pages/user/UserEdit";
import Users from "./pages/user/Users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users">
            <Route path="create" element={<UserCreate />} />
            <Route path=":id/edit" element={<UserEdit />} />
          </Route>
          <Route path="/roles">
            <Route path="" element={<Roles />} />
            <Route path="create" element={<RoleCreate />} />
            <Route path=":id/edit" element={<RoleEdit />} />
          </Route>
          <Route path="/products">
            <Route path="" element={<Products />} />
            <Route path="create" element={<ProductCreate />} />
            <Route path=":id/edit" element={<ProductEdit />} />
          </Route>
          <Route path="/orders">
            <Route path="" element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
