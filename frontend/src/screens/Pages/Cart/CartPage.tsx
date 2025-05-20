import React, { useState } from "react";
import CartItemComponent from "../../../components/CartItem/CartItem";
import { CartItem } from "../../../types/Product";
import "./CartPage.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "1",
      title: "boAt Rockerz 480 w/RGB LEDs, 6 Light Modes, 40mm Drivers, Beast Mode, 60hrs Playback, ENx Tech, BT v5.3, Adaptive Fit & Easy Access Controls, Bluetooth Headphones(Black Sabre)",
      price: 99.99,
      categories: ["Electronics", "Headphones"],
      brand: "boAt",
      attributes: new Map([
        ["colour", "red"],
      ]),
      imageUrl:
        "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_UF1000,1000_QL80_.jpg",
      quantity: 1,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>(cart.map(item => item.id));

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map(item => item.id));
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => selectedItems.includes(item.id) ? sum + item.price * item.quantity : sum,
    0
  );

  const selectedItemsCount = cart.reduce(
    (total, item) => selectedItems.includes(item.id) ? total + item.quantity : total,
    0
  );

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout!");
      return;
    }
    alert("Proceeding to checkout!");
  };

  return (
    <>
      <Navbar/>
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-items">
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              {cart.length > 0 && (
                <div className="select-all-container">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === cart.length && cart.length > 0}
                    onChange={toggleSelectAll}
                    className="select-all-checkbox"
                  />
                  <span onClick={toggleSelectAll} className="select-all-label">
                    {selectedItems.length === cart.length ? "Deselect all items" : "Select all items"}
                  </span>
                </div>
              )}
            </div>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item-container">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="item-checkbox"
                  />
                  <CartItemComponent
                    item={item}
                    onRemove={removeFromCart}
                    onQuantityChange={updateQuantity}
                  />
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>
                  Subtotal ({selectedItemsCount} items):
                </span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CartPage;