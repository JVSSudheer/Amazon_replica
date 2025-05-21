import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AISearch.css';

const AISearch = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl('');
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setImageFile(null);
  };

  const findSimilarProducts = async () => {
    if (!imageFile && !imageUrl) {
      toast.error('Please upload an image or provide a URL');
      return;
    }

    setIsLoading(true);
    setSimilarProducts([]);

    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (imageUrl) {
        formData.append('imageUrl', imageUrl);
      }

      const response = await axios.post(
        'http://localhost:8080/api/products/find-similar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSimilarProducts(response.data);
    } catch (error) {
      console.error('Error finding similar products:', error);
      toast.error('Failed to find similar products');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="similar-products-page">
      <h1>Find Similar Products</h1>
      
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
        onClick={findSimilarProducts} 
        disabled={isLoading}
        className="find-button"
      >
        {isLoading ? 'Searching...' : 'Find Similar Products'}
      </button>

      {similarProducts.length > 0 && (
        <div className="results-section">
          <h2>Similar Products</h2>
          <div className="products-grid">
            {similarProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <button onClick={() => navigate(`/product/${product.id}`)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISearch;