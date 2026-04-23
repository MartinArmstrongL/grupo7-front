import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Views/Login";
import ProductList from "./Views/BaseShop";
import Cart from "./Views/CartPage";

import './App.css'
import SuccessPage from "./Views/Success";
import CancelPage from "./Views/Cancel";
import ErrorPage from "./Views/Error";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
