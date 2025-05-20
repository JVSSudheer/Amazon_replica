import React from 'react';
import { CartItem } from '../../types/Product';
import './CartItem.css';

interface CartItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ 
  item, 
  onRemove, 
  onQuantityChange 
}) => {
  return (
    <div className="cart-item">
      <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
        <div className="quantity-controls">
          <button 
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
            +
          </button>
        </div>
        <button 
          onClick={() => onRemove(item.id)}
          className="remove-btn"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;