"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [foodCategory, setNewCategory] = useState("");
  const [foodName, setNewName] = useState("");
  const [foodQuantity, setNewQuantity] = useState("");
  const [foodType, setNewType] = useState("");
  const [foodPrice, setNewPrice] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/Login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const foodCollectionRef = collection(db, "fooditems");

  const submitItem = async () => {
    if (!foodName.trim() || !foodCategory.trim()) return;
    try {
      await addDoc(foodCollectionRef, {
        foodcategory: foodCategory,
        foodname: foodName,
        foodquantity: Number(foodQuantity) || 0,
        foodtype: foodType,
        price: Number(foodPrice) || 0,
      });
      setNewCategory("");
      setNewName("");
      setNewQuantity("");
      setNewType("");
      setNewPrice("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>🍳 Add New Dish</h2>

        <div className="form-group">
          <label htmlFor="admin-category">Category</label>
          <input
            id="admin-category"
            placeholder="e.g. breakfast, pasta, pizza"
            value={foodCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="admin-name">Name</label>
          <input
            id="admin-name"
            placeholder="e.g. Margherita Pizza"
            value={foodName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="admin-quantity">Quantity</label>
          <input
            id="admin-quantity"
            type="number"
            placeholder="e.g. 1"
            value={foodQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="admin-type">Type</label>
          <select
            id="admin-type"
            value={foodType}
            onChange={(e) => setNewType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="veg">Veg</option>
            <option value="non_veg">Non-Veg</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="admin-price">Price (₹)</label>
          <input
            id="admin-price"
            type="number"
            placeholder="e.g. 499"
            value={foodPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>

        <button className="btn-primary submit-btn" onClick={submitItem}>
          Add Item
        </button>
      </div>

      {showToast && (
        <div className="success-toast">✅ Item added successfully!</div>
      )}
    </div>
  );
}
