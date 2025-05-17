import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the Home Page</h1>
      <Footer />
    </div>
  );
};

export default Home;