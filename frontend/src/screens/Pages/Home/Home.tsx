import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import ProductsPage from "../Products/ProductsPage";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <ProductsPage/>
      <Footer />
    </div>
  );
};

export default Home;