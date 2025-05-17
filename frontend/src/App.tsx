import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Pages/Home/Home";
import Register from "./screens/Auth/Register/Register";
import Login from "./screens/Auth/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
