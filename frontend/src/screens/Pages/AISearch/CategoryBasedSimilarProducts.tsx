import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./CategoryBasedSimilarProducts.css";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";

const CategoryBasedSimilarProducts = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [identifiedCategory, setIdentifiedCategory] = useState("");
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl("");
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setImageFile(null);
  };

  const analyzeAndFindSimilar = async () => {
    if (!imageFile && !imageUrl) {
      toast.error("Please upload an image or provide a URL");
      return;
    }

    setIsLoading(true);
    setSimilarProducts([]);
    setIdentifiedCategory("");

    try {
      // Step 1: Send image to backend for analysis
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        formData.append("imageUrl", imageUrl);
      }

      console.log("FormData:", formData);

      // Step 2: Get category from image analysis
      const analysisResponse = await axios.post(
        "http://localhost:8080/api/products/analyze-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { category } = analysisResponse.data;
      console.log("Category from analysis:", category);
      setIdentifiedCategory(category);

      // Step 3: Find similar products by category
      const productsResponse = await axios.get(
        `http://localhost:8080/api/products/by-category?category=${encodeURIComponent(
          category
        )}`
      );

      setSimilarProducts(productsResponse.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to analyze image or find products");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="category-based-page">
        <h1 style={{fontSize: "40px", fontWeight: "600" }}>Find Similar Products by Category</h1>

        <div className="input-section">
          <div className="upload-box">
            <h3>Upload an Image</h3>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imageFile && (
              <div className="image-preview">
                <img src={URL.createObjectURL(imageFile)} alt="Preview" />
              </div>
            )}
          </div>

          <div className="or-divider">OR</div>

          <div className="url-input">
            <h3>Enter Image URL</h3>
            <input
              type="text"
              placeholder="https://example.com/product-image.jpg"
              value={imageUrl}
              onChange={handleUrlChange}
            />
          </div>
        </div>

        <button
          onClick={analyzeAndFindSimilar}
          disabled={isLoading}
          className="analyze-button"
        >
          {isLoading ? "Analyzing Input..." : "Find Similar Products"}
        </button>

        {identifiedCategory && (
          <div className="analysis-result">
            <h3>
              Identified Category: <span>{identifiedCategory}</span>
            </h3>
          </div>
        )}

        {similarProducts.length > 0 && (
          <div className="results-section">
            <h2>Similar Products in {identifiedCategory}</h2>
            <div className="products-flex">
              {similarProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() =>
                    console.log(`Added ${product.title} to cart`)
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryBasedSimilarProducts;
