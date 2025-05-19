import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Pages/Home/Home";
import Register from "./screens/Auth/Register/Register";
import Login from "./screens/Auth/Login/Login";
import ProductsAdmin from "./screens/Admin/ProductsAdmin";
import CartPage from "./screens/Pages/Cart/CartPage";
import ProductsPage from "./screens/Pages/Products/ProductsPage";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<ProductsAdmin />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
