import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Product } from "../../../types/Product";
import "./ProductsPage.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { getAllProducts } from "../../../services/productService";
import { toast } from "react-toastify";

const ProductsPage: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


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
