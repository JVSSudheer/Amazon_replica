import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Pages/Home/Home";
import Register from "./screens/Auth/Register/Register";
import Login from "./screens/Auth/Login/Login";
import { useAuth } from "./context/AuthContext";

function App() {

  const {user}= useAuth();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {user && user.email!=="" && (
          <Route path='/upload' element={<Home />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
