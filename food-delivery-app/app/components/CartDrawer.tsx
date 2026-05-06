"use client";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { IoClose } from "react-icons/io5";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    totalPrice,
    totalItems,
  } = useCart();
  const router = useRouter();

  if (!isCartOpen) return null;

  const handleOrder = () => {
    setIsCartOpen(false);
    router.push("/payment");
  };

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <h2>🛒 Your Cart ({totalItems})</h2>
          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <IoClose />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🛒</p>
            <p style={{ fontWeight: 600, fontSize: "1.1rem" }}>Cart is empty</p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Add some delicious dishes!
            </p>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    <Image
                      src={item.food_image}
                      alt={item.food_name}
                      width={64}
                      height={64}
                      style={{
                        objectFit: "cover",
                        borderRadius: "12px",
                        width: "64px",
                        height: "64px",
                      }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <h4>{item.food_name}</h4>
                    <p className="cart-item-price">₹{item.price}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label="Decrease"
                      >
                        <FiMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label="Increase"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span className="cart-total-price">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                className="btn-primary cart-order-btn"
                onClick={handleOrder}
              >
                🛍️ Order Now — ₹{totalPrice.toFixed(2)}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
