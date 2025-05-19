import React from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Product } from "../../../types/Product";
import "./ProductsPage.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const ProductsPage: React.FC = () => {

  const products: Product[] = [
    {
      id: 1,
      title: "boAt Rockerz 480 w/RGB LEDs, 6 Light Modes, 40mm Drivers, Beast Mode, 60hrs Playback, ENx Tech, BT v5.3, Adaptive Fit & Easy Access Controls, Bluetooth Headphones(Black Sabre)",
      price: 99.99,
      description: "High-quality wireless headphones with noise cancellation",
      image:
        "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 2,
      title: "Layers Anarc Smart Watch–1.85” AMOLED Octagonal Display I Stainless Steel–Designed in London I HiSilicon Processor I 6-axis Motion Sensor I Precise Heart Rate & SpO2 Monitoring I IP68 Water Resistant",
      price: 199.99,
      description: "Latest smart watch with fitness tracking and notifications",
      image:
        "https://m.media-amazon.com/images/I/71Swqqe7XAL._AC_UF1000,1000_QL80_.jpg",
    },
  ];

  const addToCart = (product: Product) => {
    console.log(`Added ${product.title} to cart`);
  };

  return (
    <>
      <Navbar />
      <div className="products-page">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
