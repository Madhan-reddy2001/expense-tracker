"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiCreditCard, FiSmartphone, FiDollarSign } from "react-icons/fi";

type PaymentMethod = "card" | "upi" | "cod";

export default function PaymentPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const deliveryFee = items.length > 0 ? 49 : 0;
  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + deliveryFee + tax;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setProcessing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <div className="payment-success-page">
        <div className="payment-success-card">
          <div className="success-icon">✅</div>
          <h2>Order Placed!</h2>
          <p>
            Your order has been confirmed and will be delivered shortly.
          </p>
          <p className="order-id">
            Order #{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
          <button className="btn-primary" onClick={() => router.push("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !success) {
    return (
      <div className="payment-success-page">
        <div className="payment-success-card">
          <p style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🛒</p>
          <h2>Your cart is empty</h2>
          <p>Add some dishes before placing an order.</p>
          <button className="btn-primary" onClick={() => router.push("/")}>
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-grid">
        {/* Order Summary */}
        <div className="payment-summary">
          <h2>📋 Order Summary</h2>
          <div className="payment-items">
            {items.map((item) => (
              <div key={item.id} className="payment-item">
                <div className="payment-item-img">
                  <Image
                    src={item.food_image}
                    alt={item.food_name}
                    width={56}
                    height={56}
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                      width: "56px",
                      height: "56px",
                    }}
                  />
                </div>
                <div className="payment-item-info">
                  <h4>{item.food_name}</h4>
                  <span className="payment-item-qty">x{item.quantity}</span>
                </div>
                <span className="payment-item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="payment-breakdown">
            <div className="breakdown-row">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="breakdown-row">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="breakdown-row">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="breakdown-row total">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form className="payment-form" onSubmit={handlePay}>
          <h2>💳 Payment</h2>

          <div className="payment-methods">
            {[
              { key: "card" as PaymentMethod, label: "Card", icon: <FiCreditCard /> },
              { key: "upi" as PaymentMethod, label: "UPI", icon: <FiSmartphone /> },
              { key: "cod" as PaymentMethod, label: "Cash on Delivery", icon: <FiDollarSign /> },
            ].map((m) => (
              <button
                type="button"
                key={m.key}
                className={`payment-method-btn${method === m.key ? " active" : ""}`}
                onClick={() => setMethod(m.key)}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>

          {method === "card" && (
            <div className="payment-fields">
              <div className="form-group">
                <label htmlFor="card-number">Card Number</label>
                <input
                  id="card-number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d{4})/g, "$1 ")
                        .trim()
                    )
                  }
                  required
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label htmlFor="expiry">Expiry</label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiry}
                    onChange={(e) =>
                      setExpiry(
                        e.target.value
                          .replace(/\D/g, "")
                          .replace(/(\d{2})(\d)/, "$1/$2")
                      )
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    id="cvv"
                    type="password"
                    placeholder="•••"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {method === "upi" && (
            <div className="payment-fields">
              <div className="form-group">
                <label htmlFor="upi-id">UPI ID</label>
                <input
                  id="upi-id"
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {method === "cod" && (
            <div className="payment-fields">
              <div className="cod-info">
                <p>💵 Pay with cash when your order is delivered.</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Please keep exact change ready.
                </p>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary cart-order-btn"
            disabled={processing}
          >
            {processing ? "Processing..." : `Pay ₹${grandTotal.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}
