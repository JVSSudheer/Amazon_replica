import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Pages/Home/Home";
import Register from "./screens/Auth/Register/Register";
import Login from "./screens/Auth/Login/Login";
import ProductsAdmin from "./screens/Admin/ProductsAdmin";
import CartPage from "./screens/Pages/Cart/CartPage";
// import ProductsPage from "./screens/Pages/Products/ProductsPage";
import { useAuth } from "./context/AuthContext";
import CategoryBasedSimilarProducts from "./screens/Pages/AISearch/CategoryBasedSimilarProducts";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {user.id === "" ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            </>
        ) : (
            <><Route path="/register" element={<Home />} /><Route path="/login" element={<Home />} /></>
        )}
        {user.role === "ADMIN" && (
            <Route path="/admin" element={<ProductsAdmin />} />
        )}
        <Route path="/products" element={<Home />} />
        {/* <Route path="/products" element={<ProductsPage />} /> */}
        <Route path="/cart" element={<CartPage />} />
        <Route path='/similar_products' element={<CategoryBasedSimilarProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
