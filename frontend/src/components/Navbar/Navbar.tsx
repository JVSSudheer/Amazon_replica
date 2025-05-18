import React, { useState } from "react";
import "./Navbar.css";
import amazon_logo from "../../assets/amazon_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {

  const [showOptions, setShowOptions] = useState(false);
  const {user} =useAuth();
  const navigate=useNavigate();

  const logout = async () => {
    const response= await api.post("/auth/logout",{withCredentials:true});
    if (response.status === 200) {
      console.log("Logout successful");
      localStorage.removeItem("token");
      toast.success("Logout successful");
      navigate("/login");
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <nav className="navbar">
      <div className="logoContainer">
        <img
          src={amazon_logo}
          alt="Amazon Logo"
          className="logo"
        />
      </div>
      <div className="location">
        <span>Deliver to</span>
        <br />
        <strong>Select your address</strong>
      </div>
      <div className="searchContainer">
        <select className="categorySelect">
          <option>All</option>
          <option>Books</option>
          <option>Electronics</option>
          <option>Computers</option>
          <option>Home</option>
        </select>
        <input
          type="text"
          placeholder="Search Amazon.in"
          className="searchInput"
        />
        <button className="searchButton">
          🔍
        </button>
      </div>
      <div className="navLinks">
        <div className="navItem"
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(true)}
        >
          <span>Hello, {user.email ? `${user.name}` : "Sign in"}</span>
          <br />
          <strong>Account & Lists ▾</strong>
          {showOptions && (
            <div className="dropdownOptions">
              {user.email ? (
                <>
                  <div className="logout_link" onClick={()=>logout()}>Sign Out</div>
                  <div className="account_link">Your Account</div>
                </>
              ) : (
                <Link to="/login" className="login_link">Sign In</Link>
              )}
            </div>
          )}
        </div>
        <div className="navItem">
          {/* <span>Returns</span>
          <br /> */}
          <strong>Orders</strong>
        </div>
        <div className="cart">
          <span className="cartCount">0</span>
          🛒<span className="cartText">Cart</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
