import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Product } from "../../../types/Product";
import "./ProductsPage.css";
import { getAllProducts } from "../../../services/productService";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../../../services/productService";

const ProductsPage: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const [showResults,setShowResults] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const searchQuery = searchParams.get("search");

      if(searchQuery){
        setShowResults(true);
      }else{
        setShowResults(false);
      }
      
      const fetchedProducts = searchQuery 
        ? await searchProducts(searchQuery)
        : await getAllProducts();
      
      setProducts(fetchedProducts);
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [location.search]);


  const addToCart = (product: Product) => {
    console.log(`Added ${product.title} to cart`);
  };

  return (
    <>
      <div className="products-page">
        <div className="products-grid">
          {showResults && <h2>Search Results for "{new URLSearchParams(location.search).get("search")}"</h2>}
          {!showResults && <h2>All Products</h2>}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
