import React from 'react';
import { Product } from '../../types/Product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} className="product-image" />
      
      <div className="product-info">
        <h3 className="product-title">
          {product.title.length > 200 
            ? `${product.title.substring(0, 200)}...` 
            : product.title}
        </h3>
        
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating">5</span>
          <span className="reviews">(452)</span>
        </div>
                
        <div className="price-container">
          <span className="current-price">₹{Number(product.price).toFixed(2)}</span>
        </div>
        
        <div className="prime-delivery">
          <span className="prime-badge">✔prime</span>
          <div className="delivery-time">FREE delivery Tomorrow</div>
        </div>
        
        <button 
          onClick={() => onAddToCart(product)}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
        
      </div>
    </div>
  );
};

export default ProductCard;